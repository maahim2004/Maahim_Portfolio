import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useGLTF, Float, Environment } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { animate } from 'animejs';

function Model({ scrollProgress }) {
  const { scene } = useGLTF('/models/turbofan_it_2.glb');
  const modelRef = useRef();
  const originalPositions = useRef(new Map());

  // Dynamic detection of mobile viewport width
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 768 : false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Clone the scene and apply materials for a cinematic, semi-transparent aerospace look
  const clonedScene = useMemo(() => {
    const clone = scene.clone();
    
    // Compute bounding box and center the model's pivot point at (0, 0, 0)
    const box = new THREE.Box3().setFromObject(clone);
    const center = new THREE.Vector3();
    box.getCenter(center);
    
    // Shift model inside so its volume is centered around its local origin
    clone.position.x -= center.x;
    clone.position.y -= center.y;
    clone.position.z -= center.z;

    const parentGroup = new THREE.Group();
    parentGroup.add(clone);

    parentGroup.traverse((child) => {
      if (child.isMesh) {
        child.material = child.material.clone();
        const name = child.name.toLowerCase();
        
        // Identify outer shell components for high transparency
        const outerKeywords = ['outer', 'shell', 'case', 'housing', 'cover', 'body', 'fan_cowl', 'nacelle', 'casing', 'capsule', 'frame'];
        const isOuterShell = outerKeywords.some(key => name.includes(key)) || 
                             name === "object_2" || name === "mesh_0" || name === "object_0";

        // Identify the central main shaft components
        const shaftKeywords = ['shaft', 'spool', 'axis', 'bearing', 'core', 'center_shaft', 'central'];
        const isShaft = shaftKeywords.some(key => name.includes(key));

        if (isOuterShell) {
          if (isMobile) {
            // Simplified standard material for mobile devices to avoid expensive transmission rendering
            child.material = new THREE.MeshStandardMaterial({
              color: '#38bdf8',
              wireframe: true,
              transparent: true,
              opacity: 0.15,
              side: THREE.DoubleSide,
            });
          } else {
            child.material = new THREE.MeshPhysicalMaterial({
              color: '#38bdf8',
              wireframe: true,
              transparent: true,
              opacity: 0.12, 
              side: THREE.DoubleSide,
            });
          }
        } else if (isShaft) {
          // Main central shaft - solid metal backbone for engine skeleton structural contrast
          child.material = new THREE.MeshStandardMaterial({
            color: '#888888',
            metalness: 1.0,
            roughness: 0.4,
            transparent: false,
            opacity: 1.0,
            emissive: new THREE.Color("#00F0FF"),
            emissiveIntensity: 0.05,
          });
        } else {
          // Metallic internal components - slightly transparent as requested
          child.material = new THREE.MeshStandardMaterial({
            color: '#ffffff',
            metalness: 1.0,
            roughness: 0.2,
            envMapIntensity: 1.2,
            transparent: true,
            opacity: 0.08, // Set a lower default opacity for clear reading
            emissive: new THREE.Color("#00F0FF"),
            emissiveIntensity: 0.05,
          });
        }
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    return parentGroup;
  }, [scene, isMobile]);

  // Store original mesh coordinates for exploded view calculations
  useEffect(() => {
    clonedScene.traverse((child) => {
      if (child.isMesh) {
        if (!originalPositions.current.has(child.uuid)) {
          originalPositions.current.set(child.uuid, child.position.clone());
        }
      }
    });
  }, [clonedScene]);

  // Object to hold animatable values that we will control using anime.js
  const animValues = useRef({
    modelRotationSpeed: 0.2,
    glowIntensity: 0.05,
    internalOpacity: 0.08,
    explodeFactor: 0.0,
    modelRotationX: 0.4,
    modelRotationY: 0,
    modelRotationZ: 0.2,
    modelScale: isMobile ? 1.3 : 2.5,
  });

  // Track the global scroll progress (0 to 1) and morph states based on active page sections
  useEffect(() => {
    const progress = scrollProgress;
    
    // Initialize targets
    let targetSpeed = 0.2;
    let targetGlow = 0.05;
    let targetOpacity = 0.08;
    let targetExplode = 0.0;
    let targetRotX = 0.4;
    let targetRotY = 0.0;
    let targetRotZ = 0.2;

    const baseScale = isMobile ? 1.3 : 2.5;
    let targetScale = baseScale;

    if (progress <= 0.25) {
      // Phase 1: Hero Landing (0.0 to 0.25)
      // Normal centered engine, spins up to full speed and tilts slightly
      const p = progress / 0.25; 
      targetSpeed = 0.2 + p * 0.8; // Modest model spin acceleration
      targetGlow = 0.05 + p * 0.75;
      targetOpacity = 0.08 + p * 0.12;
      targetExplode = 0.0;
      targetRotX = 0.4 - p * 0.15;
      targetRotY = p * Math.PI * 0.5;
      targetRotZ = 0.2 + p * 0.2;
      targetScale = baseScale * (1 - p * 0.08);
    } else if (progress <= 0.50) {
      // Phase 2: About (0.25 to 0.50) -> EXPLODED VIEW!
      // Housing slides radially outward, rotor stages separate along shaft Z-axis
      const p = (progress - 0.25) / 0.25;
      targetSpeed = 1.0 - p * 0.85; // Slow down spin rate to inspect components clearly (min 0.15)
      targetGlow = 0.8 + p * 0.8;
      targetOpacity = 0.20 + p * 0.25; // Increase core opacity so details show
      targetExplode = p * 1.3; // Fully exploded state
      targetRotX = 0.25 - p * 0.25; // Re-align to flat side-profile view (X = 0)
      targetRotY = (Math.PI * 0.5) + p * (Math.PI * 0.5);
      targetRotZ = 0.4 - p * 0.4; // Zero out roll tilt
      targetScale = baseScale * 0.92 * (1 - p * 0.12); // Shrink slightly to keep exploded views on screen
    } else if (progress <= 0.75) {
      // Phase 3: Projects (0.50 to 0.75) -> REASSEMBLE!
      // Components snap back together seamlessly
      const p = (progress - 0.50) / 0.25;
      targetSpeed = 0.15 + p * 0.85; 
      targetGlow = 1.6 - p * 1.2;
      targetOpacity = 0.45 - p * 0.30; // Return to transparent blueprint view
      targetExplode = 1.3 * (1 - p); // Snap back to 0.0
      targetRotX = 0.0 + p * 0.4;
      targetRotY = (Math.PI * 1.0) + p * (Math.PI * 0.5);
      targetRotZ = 0.0 + p * 0.2;
      targetScale = (baseScale * 0.81) + p * (baseScale * 0.15);
    } else {
      // Phase 4: Contact & Footer (0.75 to 1.00) -> Front Face Blueprint
      // Rotates to face forward so we look straight down the intake fan blades
      const p = (progress - 0.75) / 0.25;
      targetSpeed = 1.0 - p * 0.8; // Slow down to idle spin rate (min 0.2)
      targetGlow = 0.40 - p * 0.35;
      targetOpacity = 0.15 - p * 0.07;
      targetExplode = 0.0;
      targetRotX = 0.4 - p * 0.4; // Look straight inside (X = 0)
      targetRotY = (Math.PI * 1.5) + p * (Math.PI * 0.5);
      targetRotZ = 0.2 - p * 0.2;
      targetScale = (baseScale * 0.96) + p * (baseScale * 0.04);
    }

    animate(animValues.current, {
      modelRotationSpeed: targetSpeed,
      glowIntensity: targetGlow,
      internalOpacity: targetOpacity,
      explodeFactor: targetExplode,
      modelRotationX: targetRotX,
      modelRotationY: targetRotY,
      modelRotationZ: targetRotZ,
      modelScale: targetScale,
      duration: 600,
      ease: 'outQuad',
    });
  }, [scrollProgress, isMobile]);

  // Dynamically position turbofan for mobile/desktop (centered)
  const position = [0, 0, 0];

  // Let the frame handler apply these animated properties to the 3D meshes
  useFrame((state, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.x = animValues.current.modelRotationX;
      // Increment rotation Y smoothly frame-by-frame instead of multiplying absolute time
      modelRef.current.rotation.y += delta * animValues.current.modelRotationSpeed;
      modelRef.current.rotation.z = animValues.current.modelRotationZ;
      modelRef.current.scale.setScalar(animValues.current.modelScale);
    }

    // Update positions (exploded view) and material properties for all meshes
    clonedScene.traverse((child) => {
      if (child.isMesh) {
        // Displace position for exploded view
        const origPos = originalPositions.current.get(child.uuid);
        if (origPos) {
          const name = child.name.toLowerCase();
          
          // Central main shaft check
          const shaftKeywords = ['shaft', 'spool', 'axis', 'bearing', 'core', 'center_shaft', 'central'];
          const isShaft = shaftKeywords.some(key => name.includes(key));
          
          if (isShaft) {
            // Keep the main shaft perfectly centered and stationary so stages pull apart from it
            child.position.copy(origPos);
          } else {
            const outerKeywords = ['outer', 'shell', 'case', 'housing', 'cover', 'body', 'fan_cowl', 'nacelle', 'casing', 'capsule', 'frame'];
            const isOuter = outerKeywords.some(key => name.includes(key)) || 
                            name === "object_2" || name === "mesh_0" || name === "object_0";
            
            if (isOuter) {
              // Push outer casings radially outward in X and Y deterministically
              const dirX = origPos.x >= 0 ? 1 : -1;
              const dirY = origPos.y >= 0 ? 1 : -1;
              child.position.x = origPos.x + dirX * animValues.current.explodeFactor * 1.5;
              child.position.y = origPos.y + dirY * animValues.current.explodeFactor * 1.5;
              child.position.z = origPos.z;
            } else {
              // Slide compressor/turbine stages longitudinally along Z axis deterministically
              const dirZ = origPos.z >= 0 ? 1 : -1;
              child.position.x = origPos.x;
              child.position.y = origPos.y;
              child.position.z = origPos.z + dirZ * animValues.current.explodeFactor * 2.2;
            }
          }
        }

        // Apply updated opacity and glow
        if (child.material) {
          const name = child.name.toLowerCase();
          const outerKeywords = ['outer', 'shell', 'case', 'housing', 'cover', 'body', 'fan_cowl', 'nacelle', 'casing', 'capsule', 'frame'];
          const isOuterShell = outerKeywords.some(key => name.includes(key)) || 
                               name === "object_2" || name === "mesh_0" || name === "object_0";
          const shaftKeywords = ['shaft', 'spool', 'axis', 'bearing', 'core', 'center_shaft', 'central'];
          const isShaft = shaftKeywords.some(key => name.includes(key));

          if (!isOuterShell && !isShaft) {
            // Only fade out normal internal blades/discs for legibility
            child.material.opacity = animValues.current.internalOpacity;
          }
          if (child.material.emissive) {
            child.material.emissiveIntensity = animValues.current.glowIntensity;
          }
        }
      }
    });
  });

  return <primitive ref={modelRef} object={clonedScene} scale={isMobile ? 1.3 : 2.5} position={position} />;
}

export default function HeroTurbofan({ scrollProgress }) {
  return (
    <group>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Model scrollProgress={scrollProgress} />
      </Float>
      <Environment preset="night" />
      <ambientLight intensity={0.1} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#00F0FF" castShadow />
      <pointLight position={[-5, 5, -5]} intensity={1} color="#FF6E00" />
    </group>
  );
}

useGLTF.preload('/models/turbofan_it_2.glb');
