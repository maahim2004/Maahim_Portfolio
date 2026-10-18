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
    title: "Turbofan Engine Simulation",
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
    title: "Rally Car Suspension (Makernova 2.0)",
    status: "Tested & Validated",
    description: "High-performance suspension system designed for a scale rally car model, absorbing extreme impacts.",
    fullDescription: "Developed for the Makernova 2.0 competition, this suspension system was designed to handle high-velocity impacts and uneven terrain. The project involved rigorous dynamic testing and material selection to ensure the system could survive a 6-foot drop test while maintaining chassis stability.",
    challenge: "Achieving stable damping under 4.5kg static load and surviving dynamic 6-foot drop tests without failure.",
    tools: ["Mechanics", "Dynamic Testing", "Design"],
    color: "from-secondary/10",
    icon: "cog",
    images: [
      "/models/Makernova/WhatsApp Image 2026-03-17 at 10.05.01 PM.jpeg",
      "/models/Makernova/WhatsApp Image 2026-03-17 at 10.05.09 PM.jpeg"
    ]
  },
  {
    id: "gujcost-bot",
    title: "Agricultural bot for GUJCOST 5.0",
    status: "GUJCOST 5.0",
    description: "Autonomous agricultural robot (TOP 25 in India - Application Category) designed for precise pesticide spraying.",
    fullDescription: "Developed for the GUJCOST 5.0 competition, this robot demonstrated precision agriculture and secured a position in the TOP 25 under the Application Category across India. It integrates AI for real-time weed identification, allowing for targeted pesticide delivery which reduces chemical waste. The mechanical design features a custom spray nozzle assembly and a robust mobile platform.",
    challenge: "Developing a precise actuation system for pesticide delivery while maintaining real-time AI processing for weed identification.",
    tools: ["Three.js", "AI/ML", "Mechanical Design"],
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
    title: "Modelling of Automated Guided Vehicle",
    status: "Completed",
    description: "Design and modelling of an AGV specialized for Radio Pharmaceutical Compounding, ensuring safe transport of vials.",
    fullDescription: "Designed for use in sensitive medical environments, this AGV automates the transport of radio-pharmaceutical vials. The focus of the design was on vibration dampening and precise navigation to ensure the integrity of the compounds and the safety of the laboratory environment.",
    challenge: "Ensuring vibration-dampened transport for delicate pharmaceutical vials while maintaining precise navigation in a controlled environment.",
    tools: ["SolidWorks", "Motion Analysis", "Safety Protocols"],
    color: "from-primary/20",
    modelPath: "/models/agv.glb",
    disableTransparency: true,
    icon: "database"
  }
];
