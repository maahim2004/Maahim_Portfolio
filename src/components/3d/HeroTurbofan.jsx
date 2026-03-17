import React, { useRef, useMemo } from 'react';
import { useGLTF, Float, Environment } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Model() {
  const { scene } = useGLTF('/models/turbofan_it_2.glb');
  const modelRef = useRef();

  // Clone the scene and apply materials for a cinematic, semi-transparent aerospace look
  const clonedScene = useMemo(() => {
    const clone = scene.clone();
    clone.traverse((child) => {
      if (child.isMesh) {
        child.material = child.material.clone();
        const name = child.name.toLowerCase();
        
        // Identify outer shell components for high transparency
        const outerKeywords = ['outer', 'shell', 'case', 'housing', 'cover', 'body', 'fan_cowl', 'nacelle', 'casing', 'capsule', 'frame'];
        const isOuterShell = outerKeywords.some(key => name.includes(key)) || 
                             name === "object_2" || name === "mesh_0" || name === "object_0";

        if (isOuterShell) {
          child.material = new THREE.MeshPhysicalMaterial({
            color: '#111111',
            metalness: 0.9,
            roughness: 0.1,
            transmission: 0.95,
            thickness: 2.0,
            transparent: true,
            opacity: 0.1, 
            side: THREE.DoubleSide,
          });
        } else {
          // Metallic internal components - slightly transparent as requested
          child.material = new THREE.MeshStandardMaterial({
            color: '#aaaaaa',
            metalness: 1.0,
            roughness: 0.3,
            envMapIntensity: 1.0,
            transparent: true,
            opacity: 0.4, 
            emissive: new THREE.Color("#00F0FF"),
            emissiveIntensity: 0.05,
          });
        }
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    return clone;
  }, [scene]);

  // Slow automatic rotation on Y axis
  useFrame((state, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * 0.15;
    }
  });

  return <primitive ref={modelRef} object={clonedScene} scale={2.5} position={[2, -1, 0]} rotation={[0.4, 0, 0.2]} />;
}

export default function HeroTurbofan() {
  return (
    <group>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Model />
      </Float>
      <Environment preset="night" />
      <ambientLight intensity={0.1} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#00F0FF" castShadow />
      <pointLight position={[-5, 5, -5]} intensity={1} color="#FF6E00" />
    </group>
  );
}

useGLTF.preload('/models/turbofan_it_2.glb');
