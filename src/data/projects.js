export const projects = [
  {
    id: "neuro-prosthetic-arm",
    title: "Neuro Prosthetic Arm",
    status: "Ongoing",
    description: "Mind-controlled prosthetic arm leveraging real-time EEG signals for intuitive user control.",
    fullDescription: "The Neuro Prosthetic Arm is a cutting-edge mechatronic system designed to restore upper-limb functionality. By leveraging real-time EEG (Electroencephalogram) signals, it enables intuitive control, allowing users to perform complex tasks naturally. The project involves intricate signal processing and mechanical design to ensure smooth and responsive actuation.",
    challenge: "Translating noisy brainwaves into precise, low-latency mechanical actuations.",
    tools: ["SolidWorks", "Arduino UNO", "Raspberry Pi", "BioAmp EEG"],
    color: "from-primary/10",
    icon: "cpu"
  },
  {
    id: "turbofan-engine",
    title: "TSTA: Twin Spool Turbofan Assembly | 3D Modelling and CFD",
    status: "Completed",
    description: "Comprehensive 3D modelling and computational fluid dynamics (CFD) simulation of internal airflow.",
    fullDescription: "This project involves the high-fidelity modeling and simulation of a high-bypass turbofan engine. Utilizing computational fluid dynamics (CFD), we analyzed airflow through various stages—fan, compressor, combustion chamber, and turbine. The goal was to optimize blade geometry and thermodynamic cycles for maximum propulsion efficiency.",
    challenge: "Optimizing blade geometry to minimize turbulence and maximize thrust efficiency.",
    tools: ["SolidWorks", "ANSYS Fluent"],
    color: "from-secondary/10",
    modelPath: "/models/turbofan_it_2.glb",
    icon: "cog"
  },
  {
    id: "sentinel-bot",
    title: "SENTINEL: Autonomous Dual-Robot System for Land Restoration and Precision Farming | Team DRISHTI",
    status: "NIDHI PRAYAS Finalist",
    description: "Semi-autonomous dual robotic system (Lumora & Sprovia) fusing robotics, AI and precision agriculture to restore degraded land and promote sustainable, non-intensive farming.",
    fullDescription: "Conceptualized Sentinel, a semi-autonomous dual robotic system comprising Sentinel Alpha (Lumora) and Sentinel Beta (Sprovia), built as a fusion of robotics, artificial intelligence and precision agriculture to restore degraded land and promote sustainable, non-intensive farming. Designed around a Robot-as-a-Service (RaaS) model, the system delivers data-driven interventions for soil restoration, precision agrochemical application and ecosystem rehabilitation while aligning with UN Sustainable Development Goals (SDGs 2, 3, 6, 9, 12 and 15). The concept was developed as a startup proposal and was selected as a finalist in the NIDHI PRAYAS Program.\n\nLumora was designed to perform on-site soil health assessment using a 7-in-1 soil sensor, auger-based soil engaging assembly, lead-screw linear actuators, AI-assisted soil diagnostics and automated seed pod and sapling plantation for agroforestry. Sprovia complemented the restoration workflow through V-shaped furrow cutters, strip tilling, intercropping, mulching, targeted nutrient delivery and precision spraying. The proposed system incorporated ROS, Raspberry Pi 4, Arduino Mega 2560, Sony IMX219 cameras, HC-SR04 ultrasonic sensors, GPS-IMU, planetary DC motors, stepper motors, servo motors and lead-screw linear actuators to coordinate autonomous navigation, soil sampling, crop-weed classification and precision field operations.\n\nThe solution was envisioned for farmers, environmental organizations, NGOs, rural communities, government agencies including MoAFW, MoEFCC, FSI and ICAR, as well as CSR-led land restoration initiatives, supporting seasonal or cyclic deployment based on restoration objectives and farming requirements.",
    challenge: "Coordinating a dual-robot ecosystem (Lumora & Sprovia) with integrated soil diagnostics, autonomous navigation, and precision agrochemical application under a Robot-as-a-Service model for degraded land restoration.",
    tools: ["ROS", "Raspberry Pi 4", "Arduino Mega 2560", "Sony IMX219", "GPS-IMU", "SolidWorks"],
    color: "from-primary/10",
    models: [
      "/models/Sentinel/Sentinel_V1.glb",
      "/models/Sentinel/Sentinel_V2.glb",
      "/models/Sentinel/Sentinel_V3.glb"
    ],
    icon: "database"
  },
  {
    id: "rally-car-suspension",
    title: "STABILO: Rally Car Suspension System",
    status: "MAKERNOVA 2.0 • Validated",
    description: "Scale rally car featuring a non-Grashof four-bar coil spring suspension (k = 2.45 N/mm) validated under 4.5 kg load and 7 ft dynamic drop tests.",
    fullDescription: "As part of MAKERNOVA 2.0 conducted by DRISHTI, SVNIT, our team designed and fabricated STABILO, a rally car featuring a non-Grashof four-bar coil spring suspension with a spring constant of 2.45 N/mm. The prototype had overall dimensions of 300 × 260 × 98 mm (wheelbase × track width × ground clearance) with a 420 × 170 mm chassis.\n\nMy contributions included CAD design, fabrication and suspension evaluation. The suspension system was assessed through 4.5 kg load tests, achieving a ground clearance of 87.9 mm, and further validated through 7 ft and 5 ft drop tests to evaluate structural integrity, shock absorption and suspension performance. The project provided hands-on experience in mechanism design, fabrication, force analysis and suspension system validation.",
    challenge: "Synthesizing non-Grashof four-bar linkage kinematics with 2.45 N/mm spring stiffness to endure 7 ft & 5 ft dynamic drop impacts while maintaining 87.9 mm ground clearance under 4.5 kg static payload.",
    tools: ["CAD Design", "Four-Bar Kinematics", "Dynamic Drop Testing", "Load Testing", "Fabrication"],
    color: "from-secondary/10",
    icon: "cog",
    images: [
      "/models/Makernova/WhatsApp Image 2026-03-17 at 10.05.01 PM.jpeg",
      "/models/Makernova/WhatsApp Image 2026-03-17 at 10.05.09 PM.jpeg"
    ]
  },
  {
    id: "gujcost-bot",
    title: "AAR: Autonomous Agricultural Robot for Precision Farming | Team DRISHTI",
    status: "Top 25 in India • GUJCOST 5.0",
    description: "Autonomous 4WD agricultural robot integrating CV-based crop-weed identification, modified double-wishbone suspension, and precision spraying. Top 25 across India.",
    fullDescription: "Developed AAR (Autonomous Agricultural Robot) for the GUJCOST Robofest 5.0 Senior Level Application-Based Category, integrating computer vision based crop and weed identification, autonomous field navigation and precision spraying for sustainable farming. A functional proof-of-concept was designed and fabricated to demonstrate line following, crop and weed detection, targeted spraying and structured field traversal, earning selection among the Top 25 teams across India.\n\nThe 300 × 298 × 290 mm four-wheel drive robot featured an Aluminium 6061 chassis, a modified suspension geometry inspired by double wishbone kinematics, a lead screw driven spraying assembly, rack-and-pinion nozzle positioning, an LDPE chemical tank, and a four-bar soil sensing mechanism.\n\nThe robot incorporated ROS, Raspberry Pi 4, Arduino Mega 2560, ESP32, Raspberry Pi Camera, HC-SR04 ultrasonic sensors and rotary encoders for field navigation, obstacle avoidance, crop and weed detection, and precision spraying. Design calculations estimated a 6.5 kg operating weight, 0.306 Nm minimum drive motor torque, 0.081 Nm lifting torque for the spraying assembly, and 28 N rack-and-pinion actuation force.",
    challenge: "Synthesizing 4WD double-wishbone suspension kinematics, lead-screw spraying, and rack-and-pinion nozzle positioning under a 6.5 kg operating weight envelope with real-time CV crop-weed classification.",
    tools: ["ROS", "Raspberry Pi 4", "Arduino Mega 2560", "ESP32", "Computer Vision", "Aluminium 6061"],
    color: "from-secondary/10",
    modelPath: "/models/gujcost_bot.glb",
    icon: "cog",
    images: [
      "/images/gujcost/gujcost_1.jpg",
      "/images/gujcost/gujcost_team.jpg"
    ]
  },
  {
    id: "agv-pharmaceutical",
    title: "RADIAX: Automated Guided Vehicle (AGV) for Radiopharmaceutical Material Handling | Team DRISHTI",
    status: "GUJCOST Robofest 5.0",
    description: "Automated Guided Vehicle designed to automate the transport and placement of radioactive isotope vials and lead-shielded containers, minimizing radiation exposure.",
    fullDescription: "Conceptualized RADIAX, an Automated Guided Vehicle (AGV) for radiopharmaceutical compounding, designed to automate the pickup, transport and placement of radioactive isotope vials and lead-shielded containers, minimizing manual handling and radiation exposure in nuclear medicine facilities under GUJCOST Robofest 5.0.\n\nThe initial concept featured a 330 × 320 mm Aluminium 6061 chassis with mecanum wheels for omnidirectional mobility and a screw-driven lifting mechanism providing 600 mm of vertical reach. The final iteration evolved into a compact 300 × 300 × 300 mm platform incorporating a lead screw actuated scissor lift, guided rails, stabilizing rods, a rack-and-pinion parallel gripper, and a 500 g to 1 kg counterweight for improved lifting stability, extending the lifting height to approximately 4 ft.\n\nThe electronic framework comprised a Raspberry Pi 4, Arduino Mega 2560, ESP32, RPLIDAR C1, GPS-IMU, camera module and ROS 2, with Gazebo used for simulation, enabling navigation, obstacle detection and automated pick-and-place operations.",
    challenge: "Engineering a compact 300 × 300 × 300 mm platform with a lead-screw scissor lift reaching ~4 ft, stabilizing counterweights, and omnidirectional radiation vial pick-and-place.",
    tools: ["ROS 2", "Gazebo", "RPLIDAR C1", "Raspberry Pi 4", "SolidWorks", "Aluminium 6061"],
    color: "from-primary/20",
    modelPath: "/models/agv.glb",
    disableTransparency: true,
    icon: "database"
  }
];
