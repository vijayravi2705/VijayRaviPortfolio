// constants/work.ts

export type Project = {
  id: string;
  slug: string;
  title: string;
  chip: string;
  desc: string;
  image: string;
  size: "xl" | "lg" | "md" | "wide";
  problem: string;
  approach: string;
  result: string;
  tags: string[];
  link: string | null;
  labels?: [string, string, string];
};

export const projects: Project[] = [
  {
    id: "attendance",
    slug: "attendance.app",
    title: "Smart Attendance System",
    chip: "Full-Stack · Cloud",
    desc: "React + Node.js platform with MySQL on AWS RDS. Frontend on EC2, RESTful backend, S3 file storage.",
    image: "/assets/images/work/samcoverpage.png",
    size: "xl",
    problem:
      "Manual attendance tracking across classes was slow, error-prone, and gave no real-time visibility into records.",
    approach:
      "Built a React front end talking to a Node.js/Express REST API, deployed on an AWS EC2 instance. Records are persisted in MySQL on AWS RDS, with supporting files stored in S3.",
    result:
      "A working full-stack deployment on real cloud infrastructure — a template for any record-keeping tool that needs to scale beyond a spreadsheet.",
    tags: ["React", "Node.js", "AWS EC2", "AWS RDS", "MySQL", "S3"],
    link: "https://github.com/vijayravi2705/SAM",
  },
  {
    id: "emotion",
    slug: "emotion-cnn.app",
    title: "Face Emotion Recognition",
    chip: "Computer Vision",
    desc: "CNN in TensorFlow/Keras reading emotion off a live webcam feed via OpenCV.",
    image: "/assets/images/work/facecoverpage.png",
    size: "lg",
    problem:
      "Reading emotional state from a live camera feed in real time, without noticeable lag.",
    approach:
      "Trained a convolutional neural network in TensorFlow/Keras on facial-expression data, then wired it to OpenCV for frame capture and live inference off a webcam.",
    result:
      "A responsive, real-time emotion classifier — the foundation this project later reused for the drowsy-driver detector.",
    tags: ["TensorFlow", "Keras", "OpenCV", "CNN"],
    link: "https://github.com/vijayravi2705/emotion-recognisation.git",
  },
  {
    id: "drowsy",
    slug: "drowsy-detect.app",
    title: "Drowsy Driver Detection",
    chip: "Safety Tech",
    desc: "Eye Aspect Ratio tracking via Dlib + OpenCV triggers a real-time fatigue alert.",
    image: "/assets/images/work/drowsycoverpage.png",
    size: "md",
    problem:
      "Driver fatigue is a major cause of road accidents, and needs to be caught before it becomes dangerous — not after.",
    approach:
      "Used Dlib facial landmarks to compute Eye Aspect Ratio (EAR) frame by frame via OpenCV, flagging sustained eye closure as a fatigue signal and firing a real-time alert.",
    result:
      "A lightweight, camera-only safety layer that could run on low-cost in-cabin hardware.",
    tags: ["Dlib", "OpenCV", "Python", "EAR"],
    link: "https://github.com/vijayravi2705/drowsy-driver-detection.git",
  },
  {
    id: "tabnet",
    slug: "tabnet.app",
    title: "TabNet Income Classification",
    chip: "Applied ML",
    desc: "15+ models (XGBoost, LightGBM, CatBoost, DNN) benchmarked to ~89% accuracy.",
    image: "/assets/images/work/multi.png",
    size: "md",
    problem:
      "Predicting income bracket from census-style tabular data, and finding which model family actually earns its complexity.",
    approach:
      "Benchmarked 15+ models — including XGBoost, LightGBM, CatBoost, TabNet, and a custom DNN — across consistent preprocessing and evaluation splits.",
    result:
      "Landed on ~89% accuracy, with a clear comparison of gradient-boosted trees versus deep tabular models on the same dataset.",
    tags: ["XGBoost", "LightGBM", "CatBoost", "TabNet", "DNN"],
    link: "https://github.com/vijayravi2705/multi-alg-income-classification.git",
  },
  {
    id: "women",
    slug: "women-safety.app",
    title: "Smart Women Protection System",
    chip: "IoT",
    desc: "Arduino + Neo-6M GPS + SIM800C GSM — fires an emergency SMS with live location.",
    image: "/assets/images/work/iot.png",
    size: "wide",
    problem:
      "In an emergency, getting a live location out fast — without needing a smartphone or app — can matter more than anything else.",
    approach:
      "Combined an Arduino microcontroller with a Neo-6M GPS module and a SIM800C GSM module, so a single trigger reads the current location and fires it out as an SMS.",
    result:
      "A standalone, low-power hardware unit that doesn't depend on a smartphone, app, or internet connection to get help moving.",
    tags: ["Arduino", "Neo-6M GPS", "SIM800C GSM", "Embedded C"],
    link: "https://github.com/vijayravi2705/IOT-ALERT-SYS.git",
  },
  {
    id: "greenrush",
    slug: "green-rush.app",
    title: "Green Rush",
    chip: "Game Dev",
    desc: "2D Pygame arcade game — procedural maps, real-time input, live scoring.",
    image: "/assets/images/work/green.png",
    size: "wide",
    problem:
      "Wanted to build a complete, playable arcade game from scratch — game loop, input, scoring, and all — outside of a web framework.",
    approach:
      "Built a 2D arcade game in Pygame with procedurally generated maps, real-time keyboard input handling, and a live scoring system.",
    result:
      "A fully playable game loop, and a solid grounding in real-time input handling and procedural generation outside of typical web dev.",
    tags: ["Python", "Pygame", "Procedural Generation"],
    link: "https://github.com/vijayravi2705",
  },
  {
    id: "securehostel",
    slug: "securehostel.app",
    title: "SecureHostel",
    chip: "Cybersecurity · Full-Stack",
    desc: "Role-based hostel complaint platform with AES encryption, tracking, automated notifications and an analytics dashboard.",
    image: "assets/images/work/sh.png",
    size: "lg",
    problem:
      "Hostel complaint handling was manual and insecure — no encryption, no audit trail, and no clear ownership of who should resolve what.",
    approach:
      "Built a role-based complaint management platform with AES encryption on sensitive data, full complaint tracking, automated status notifications, and an analytics dashboard for admins.",
    result:
      "A secure, auditable complaint pipeline — encrypted data at rest, clear role boundaries, and visibility into resolution trends instead of a black box.",
    tags: [
      "AES Encryption",
      "RBAC",
      "Complaint Tracking",
      "Analytics Dashboard",
    ],
    link: "https://github.com/vijayravi2705/secureHostel.git",
  },
  {
    id: "botnet",
    slug: "botnet-shield.app",
    title: "AI-Based Botnet Detection & Multilingual Spam Classification",
    chip: "Cybersecurity · AI",
    desc: "Ensemble learning + transformer-based spam detection with anomaly detection and explainable AI.",
    image: "assets/images/work/bot.png",
    size: "wide",
    problem:
      "Botnet traffic and spam keep shifting shape, and a single model rarely holds up against both network-level attacks and spam across multiple languages.",
    approach:
      "Combined ensemble learning for anomaly and botnet detection with a transformer-based classifier for multilingual spam, then layered in explainable AI so each flag comes with a reason, not just a verdict.",
    result:
      "A two-pronged threat-detection system that stays accurate across attack types and languages, with explainability built in for analyst trust.",
    tags: [
      "Ensemble Learning",
      "Transformers",
      "Anomaly Detection",
      "Explainable AI",
    ],
    link: "https://github.com/vijayravi2705/botnet-spam.git",
  },
  {
    id: "islr",
    slug: "isl-recognition.app",
    title: "Indian Sign Language Recognition",
    chip: "Computer Vision · Deep Learning",
    desc: "MediaPipe + Conv-BiGRU-Transformer architecture for real-time gesture recognition.",
    image: "assets/images/work/isl.png",
    size: "md",
    problem:
      "Real-time Indian Sign Language recognition needs to track a gesture as it unfolds over time off a live camera feed, not just classify a single frame.",
    approach:
      "Used MediaPipe for hand and pose landmark extraction, feeding a Conv-BiGRU-Transformer architecture that combines convolutional feature extraction, recurrent temporal modelling, and self-attention.",
    result:
      "A real-time gesture recognition pipeline that reads Indian Sign Language directly off a webcam with low latency.",
    tags: ["MediaPipe", "Conv-BiGRU", "Transformer", "Real-Time CV"],
    link: "https://github.com/vijayravi2705/ISL-detection-sc.git",
  },
];
