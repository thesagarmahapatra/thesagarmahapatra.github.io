export interface Project {
  id: string;
  name: string;
  shortDesc: string;
  technologies: string[];
  github?: string;
  demo?: string;
  badge?: string;
  highlights: string[];
  details: string;
  status: 'completed' | 'in-progress' | 'active';
  category: 'systems' | 'ai' | 'infrastructure' | 'crypto';
}

export interface ResearchItem {
  id: string;
  title: string;
  period: string;
  affiliation: string;
  tags: string[];
  points: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  location: string;
  technologies: string[];
  points: string[];
}

export interface SkillCategory {
  category: string;
  items: Array<{
    name: string;
    level: number;
    icon?: string;
  }>;
}

export interface EducationItem {
  institution: string;
  period: string;
  degree: string;
  specialization: string;
  standing: string;
  department: string;
  details: string[];
}

export interface AchievementItem {
  title: string;
  badge: string;
  description: string;
  link?: string;
  linkText?: string;
}

export const personalInfo = {
  name: 'Sagar Swaraj Mahapatra',
  title: 'Graduate Student (M.Tech) & Systems/ML Researcher',
  lab: 'Machine Learning Lab, Dept. of Computer Science & Engineering (CSE)',
  desk: 'Machine Learning Lab / Computer Centre (New CSE Building), IIT Bombay',
  affiliation: 'Affiliated with BharatGen (MeitY, Govt. of India)',
  academicDept: 'Dept. of Electrical Engineering (Machine Learning), IIT Bombay',
  cpi: '9.03 / 10.0',
  rank: 'Department Rank 1 (DR 1) in Specialization',
  gate: 'GATE 99+ Percentile in both Data Science & AI (DA) and Computer Science (CS)',
  jest: 'JEST Computer Science AIR 58 (Interview calls from IISc Bangalore CSA & CDS)',
  email: '24m1076@iitb.ac.in',
  github: 'https://github.com/thesagarmahapatra',
  githubUser: 'thesagarmahapatra',
  linkedin: 'https://www.linkedin.com/in/sagar-mahapatra/',
  codeforces: 'https://codeforces.com/profile/bombaycoder',
  codeforcesHandle: 'bombaycoder',
  codeforcesRating: '1628 (Expert)',
  location: 'Powai, Mumbai 400076, India',
  interests: ['LLM Inference Runtimes', 'C++ SIMD Optimization', 'Speculative Decoding', 'Distributed Systems', 'Campus Computing Infrastructure']
};

export const projects: Project[] = [
  {
    id: 'vectorffn',
    name: 'VectorFFN: On-Device LLM Inference Engine for ARM64 SIMD',
    shortDesc: 'Cache-tiled matrix multiplication engine in C++17 with custom ARM NEON microkernels and fused SwiGLU activations.',
    technologies: ['C++17', 'ARM NEON', 'OpenMP', 'SIMD', 'INT8 Quantization'],
    github: 'https://github.com/thesagarmahapatra/VectorFFN',
    badge: 'C++17 • ARM NEON • OpenMP',
    category: 'systems',
    highlights: [
      'Engineered cache-tiled matrix multiplication engine in C++17 with custom ARM NEON microkernels.',
      'Fused SwiGLU (LLaMA-3/Mistral) activations, eliminating intermediate buffers to reduce DRAM traffic by 80%.',
      'Achieved up to 190x speedup on Apple Silicon and Qualcomm Snapdragon via INT8 quantization.',
      'Designed 4x16 weight-packing layouts with OpenMP core-affinity to maximize CPU cache hit rates.'
    ],
    details: `VectorFFN is a high-performance, bare-metal C++17 inference runtime engineered specifically for ARM64 architectures (Apple Silicon M-series and Snapdragon processors).

Key Architectural Innovations:
• ARM NEON Assembly Microkernels: Hand-crafted 4x16 register-blocked GEMM kernels avoiding pipeline stalls.
• Fused SwiGLU Activations: Fuses element-wise gate and up-projection passes in registers, minimizing memory bandwidth bottlenecks.
• Cache-Oblivious Tiling: L1/L2/L3 cache-friendly blocking tailored to ARM cache line sizes.
• INT8 Quantization: Quantized matrix-vector and matrix-matrix multiply primitives delivering up to 190x speedups compared to unoptimized baselines.`,
    status: 'completed'
  },
  {
    id: 'irongateway',
    name: 'IronGateway: Enterprise Mail Security Gateway',
    shortDesc: 'High-throughput campus mail security boundary safeguarding 20,000+ IIT Bombay accounts with sub-ms Redis rate limiting.',
    technologies: ['Enterprise Postfix', 'Redis Streaming', 'ClamAV', 'SpamAssassin', 'Proxmox MG', 'Ansible', 'SLURM'],
    badge: 'Enterprise Postfix • Redis Daemon',
    category: 'infrastructure',
    highlights: [
      'Architected HA mail cluster (IronGateway PMG) with automatic failover, serving 20,000+ campus accounts.',
      'Engineered sub-ms Redis rate-limiting daemon with zero-data-loss Postfix HOLD queue containment.',
      'Built async Redis streaming pipeline, cutting telemetry latency from 3.8s to <12ms.',
      'Automated compromised account isolation and spool freezing with ClamAV and SpamAssassin.',
      'Hardened deliverability via 2048-bit DKIM & SPF/DMARC; managed 100+ nodes with Ansible.'
    ],
    details: `IronGateway powers the production email security perimeter at IIT Bombay Computer Centre.

Architecture Overview:
• Active-Passive / Active-Active Proxmox Mail Gateway cluster with automated DNS and IP failover.
• Custom Go/Python daemon interfacing with Postfix policy delegation to inspect sender burst thresholds in sub-millisecond Redis memory lookups.
• Automatic quarantine mechanism placing abusive accounts into HOLD queues without message drops.
• Full DKIM signing, ARC validation, and DMARC enforcement protecting institutional reputation.`,
    status: 'active'
  },
  {
    id: 'nanotorch',
    name: 'nanoTorch: Dependency-Free C++ Deep Learning Framework',
    shortDesc: 'Zero-dependency C++ tensor computational engine from scratch featuring dynamic memory management and autograd.',
    technologies: ['C++', 'Autograd Engine', 'Linear Algebra', 'Deep Learning from Scratch'],
    github: 'https://github.com/thesagarmahapatra/nanoTorch',
    badge: 'C++ • Autograd from Scratch',
    category: 'ai',
    highlights: [
      'Engineered a zero-dependency C++ tensor engine from scratch featuring dynamic memory management and autograd.',
      'Implemented core neural network components including Linear layers, ReLU/Sigmoid activations, and loss functions.',
      'Trained and evaluated full neural networks on MNIST achieving 99.35% train accuracy and 96.35% test accuracy.'
    ],
    details: `nanoTorch is a ground-up implementation of a computational graph and automatic differentiation engine written purely in modern C++ without external third-party matrix libraries.

Components:
• Tensor: Multi-dimensional array with strides, broadcasting, and backward gradient accumulators.
• Reverse-Mode Autograd: Directed Acyclic Graph (DAG) construction during the forward pass with topological sort traversal for backpropagation.
• Optimizer: Stochastic Gradient Descent (SGD) and Adam implementations.
• Benchmarks: Validated on MNIST digit recognition achieving 96.35% test accuracy.`,
    status: 'completed'
  },
  {
    id: 'bitcoin-simulator',
    name: 'Bitcoin Protocol & Distributed Consensus Simulator',
    shortDesc: 'Modular Bitcoin simulator for transaction validation, block mining, stack-based bytecode execution, and cryptographic verification.',
    technologies: ['Python', 'Cryptography', 'ECDSA', 'Schnorr', 'Proof-of-Work', 'Blockchain'],
    github: 'https://github.com/thesagarmahapatra/Bitcoin-Simulator-Engine',
    badge: 'Python • Cryptography • Blockchain',
    category: 'crypto',
    highlights: [
      'Developed a modular Bitcoin simulator for transaction validation, block mining, and cryptographic verification.',
      'Built a stack-based bytecode interpreter to parse and execute custom opcodes for transaction validation.',
      'Implemented ECDSA and Schnorr signature algorithms for secure user authentication.',
      'Created a Proof-of-Work mining engine utilizing double SHA-256 hashing and binary block header serialization.'
    ],
    details: `A comprehensive simulation of the Bitcoin Core consensus protocol and VM.

Key Features:
• Script Engine: Forth-like stack-based VM supporting OP_DUP, OP_HASH160, OP_CHECKSIG, and conditional branches.
• Cryptographic Signatures: Full ECDSA over secp256k1 and modern Schnorr signature verification (BIP 340).
• Mining & Difficulty: Dynamic target difficulty adjustment mimicking Bitcoin's 2016-block window algorithm.
• Mempool & UTXO Set: Efficient in-memory UTXO cache with double-spend detection.`,
    status: 'completed'
  },
  {
    id: 'langchain-qa',
    name: 'Document Q&A: Retrieval-Augmented Generation (RAG Pipeline)',
    shortDesc: 'End-to-end RAG pipeline integrating vector similarity search with LLM prompting for grounded question answering.',
    technologies: ['Python', 'LangChain', 'Vector DB', 'Streamlit', 'HuggingFace', 'FAISS'],
    github: 'https://github.com/thesagarmahapatra/LangChain-QA',
    badge: 'Python • LangChain • Vector DB • Streamlit',
    category: 'ai',
    highlights: [
      'Engineered an end-to-end RAG pipeline integrating vector search with LLM prompting for grounded question answering.',
      'Optimized semantic retrieval via recursive document chunking, dense embeddings, and tuned similarity indexing.',
      'Developed an interactive Streamlit UI with customizable retrieval hyperparameters and real-time LLM streaming.'
    ],
    details: `A production-grade Retrieval-Augmented Generation system designed for complex document understanding and citation-backed synthesis.

Highlights:
• Dense retrieval with FAISS and ChromaDB.
• Hybrid keyword + semantic reranking.
• Real-time token streaming with citation tracking.`,
    status: 'completed'
  },
  {
    id: 'eagle3',
    name: 'EAGLE3: Speculative Decoding & Acceleration Engine',
    shortDesc: 'Speculative decoding acceleration engine exploring draft trees and multi-token prediction on consumer GPUs.',
    technologies: ['PyTorch', 'Speculative Decoding', 'Transformers', 'CUDA', 'LLM Acceleration'],
    github: 'https://github.com/thesagarmahapatra/EAGLE3',
    badge: 'PyTorch • Speculative Decoding',
    category: 'systems',
    highlights: [
      'Implemented speculative decoding techniques to accelerate transformer inference without quality loss.',
      'Benchmarked multi-token prediction and speculative draft verification on consumer GPUs.',
      'Explored tree-attention verification mask creation for non-autoregressive parallel verification.'
    ],
    details: `Research implementation testing draft candidate expansion, tree-attention verification, and latency-throughput trade-offs in speculative decoding runtimes.`,
    status: 'completed'
  },
  {
    id: 'iitb-nlp',
    name: 'IIT Bombay NLP & Coursework Repositories',
    shortDesc: 'Natural Language Processing, medical organ segmentation, and RIP routing protocol implementations.',
    technologies: ['Python', 'PyTorch', 'Transformers', 'OpenCV', 'C++'],
    github: 'https://github.com/thesagarmahapatra/IITB-NLP',
    badge: 'CS 626 / CS 725 • Deep Learning',
    category: 'ai',
    highlights: [
      'IITB-NLP (CS 626): NLP sequence modeling, sentiment analysis, and dependency parsing.',
      'Organ-Classification (CS 725): Medical image segmentation and deep learning classification pipelines.',
      'RoutingInformationProtocol (C++): Dynamic routing protocol RIP v2 simulation in C++.'
    ],
    details: `A curated collection of academic research implementations completed at IIT Bombay in CSE courses CS 626 (Speech & NLP) and CS 725 (Foundations of Machine Learning).`,
    status: 'completed'
  }
];

export const researchProjects: ResearchItem[] = [
  {
    id: 'speculative-decoding',
    title: 'Speculative Decoding & Multi-Token Drafting for LLMs',
    period: '2024 – Present',
    affiliation: 'Machine Learning Lab, CSE, IIT Bombay • Affiliated with BharatGen',
    tags: ['LLM Inference', 'Speculative Decoding', 'EAGLE', 'MTP', 'MoE Optimization'],
    points: [
      'Implemented Speculative Decoding, Multi-Token Prediction (MTP), and EAGLE architectures on Param 1 and Param 2 models of BharatGen (India\'s Foundational LLMs).',
      'Investigating LoRA-adapted, EAGLE-style group drafter heads for multi-token speculative decoding over semantic spans to accelerate LLM inference speeds.',
      'Designing adaptive speculation stopping via an RLOO-trained policy with soft depth constraints and tree-attention draft verification.',
      'Optimizing expert-locality metrics for Mixture-of-Experts (MoE) architectures to reduce KV-cache thrashing and memory traffic.'
    ]
  },
  {
    id: 'rope-semantic',
    title: 'Structural RoPE Modification via Semantic Grouping',
    period: 'Jan 2026 – May 2026',
    affiliation: 'R&D Project | IIT Bombay (in collaboration with Zoho Corporation)',
    tags: ['RoPE', 'Context Compression', 'Indic NLP', 'KV-Cache'],
    points: [
      'Engineered dynamic Rotary Position Embedding (RoPE) modifications, addressing fragmentation in Indic languages by grouping semantic units.',
      'Trained an LSTM boundary predictor on LLM hidden states, achieving an 84.84% F1 score for word boundaries.',
      'Compressed the effective context window by 44% via semantic token grouping to optimize KV-cache memory footprints.'
    ]
  },
  {
    id: 'accelerating-inference',
    title: 'Accelerating Inference in Large Language Models',
    period: 'Jul 2025 – Dec 2025',
    affiliation: 'Graduate Seminar | IIT Bombay',
    tags: ['PagedAttention', 'vLLM', 'FlashAttention', 'PARAM-1'],
    points: [
      'Comprehensive study of speculative decoding methods, dynamic draft trees, and draft-model design trade-offs.',
      'Benchmarked production serving optimizations including PagedAttention (vLLM) and FlashAttention for large-scale deployments.',
      'Achieved up to 3.1x speedup on PARAM-1 (2.9B) with 70% token acceptance rate using dynamic draft trees.'
    ]
  }
];

export const experience: ExperienceItem[] = [
  {
    id: 'bharatgen',
    role: 'AI Engineer Intern',
    organization: 'BharatGen (MeitY, Govt. of India)',
    period: 'May 2026 – Present',
    location: 'IIT Bombay Machine Learning Lab',
    technologies: ['Python', 'PyTorch', 'Ray', 'NVIDIA Triton', 'CTranslate2', 'Whisper', 'AWS SageMaker'],
    points: [
      'Implemented Speculative Decoding, MTP, and EAGLE drafting on Param 1 and Param 2 models of BharatGen (India\'s Foundational LLMs).',
      'Scaled distributed audio ingestion pipeline on AWS across 2M+ hours of speech data.',
      'Engineered zero-lock in-memory task leasing engine auto-handling 4M+ concurrent tasks.',
      'Accelerated GPU batch decoding 4.2× (<80ms P95 latency) using CTranslate2 C++ on NVIDIA Triton.',
      'Synthesized full-duplex time-aligned stereo dialogue datasets for sovereign Speech-LLMs.'
    ]
  },
  {
    id: 'iitb-cc',
    role: 'Campus Mail Infrastructure & Systems Administrator',
    organization: 'Computer Centre, IIT Bombay',
    period: 'Jul 2024 – Present',
    location: 'Computer Centre, New CSE Building, IIT Bombay',
    technologies: ['Enterprise Postfix', 'Redis', 'Proxmox MG', 'ClamAV', 'SpamAssassin', 'Ansible', 'SLURM'],
    points: [
      'Architected HA mail cluster (IronGateway PMG) with automatic failover, serving 20,000+ campus accounts.',
      'Engineered sub-ms Redis rate-limiting daemon with zero-data-loss Postfix HOLD queue containment.',
      'Built async Redis streaming pipeline, cutting telemetry latency from 3.8s to <12ms.',
      'Automated compromised account isolation and spool freezing with ClamAV and SpamAssassin.',
      'Hardened deliverability via 2048-bit DKIM & SPF/DMARC; managed 100+ nodes with Ansible and SLURM.'
    ]
  },
  {
    id: 'iisc-intern',
    role: 'Research Intern',
    organization: 'Spectrum Lab, IISc Bangalore',
    period: 'Jun 2018 – Aug 2018',
    location: 'Indian Institute of Science Bangalore',
    technologies: ['Keras', 'Kotlin', 'OpenCV', 'Android', 'Cubic B-Spline'],
    points: [
      'Built deep learning CNN pipeline to classify diabetic retinopathy severity across 3 clinical grades.',
      'Developed Android app for retinal fundus segmentation using Cubic B-Spline active contour models.'
    ]
  }
];

export const skillCategories: SkillCategory[] = [
  {
    category: '⚡ Programming Languages & Scripting',
    items: [
      { name: 'C', level: 90, icon: '⚙️' },
      { name: 'C++ (C++17/20)', level: 95, icon: '⚡' },
      { name: 'Python', level: 95, icon: '🐍' },
      { name: 'Bash / Shell', level: 90, icon: '🐚' },
      { name: 'SQL', level: 85, icon: '🗄️' },
      { name: 'JavaScript / TypeScript', level: 88, icon: '📘' },
      { name: 'HTML5 / CSS3', level: 85, icon: '🎨' }
    ]
  },
  {
    category: '🧠 Machine Learning & Inference Systems',
    items: [
      { name: 'PyTorch', level: 95, icon: '🔥' },
      { name: 'Hugging Face Transformers', level: 92, icon: '🤗' },
      { name: 'Speculative Decoding & MTP', level: 95, icon: '🚀' },
      { name: 'NVIDIA Triton Inference Server', level: 88, icon: '🟢' },
      { name: 'CTranslate2 (C++ Runtime)', level: 88, icon: '⚙️' },
      { name: 'vLLM & PagedAttention', level: 90, icon: '📖' },
      { name: 'FlashAttention', level: 85, icon: '⚡' },
      { name: 'Ray Distributed Computing', level: 82, icon: '☀️' },
      { name: 'NeMo & Whisper', level: 85, icon: '🎙️' },
      { name: 'NumPy / SciPy / Scikit-Learn', level: 90, icon: '📊' }
    ]
  },
  {
    category: '🛠️ Systems, Infrastructure & DevOps',
    items: [
      { name: 'Linux / Unix Internals', level: 95, icon: '🐧' },
      { name: 'Proxmox VE & PMG', level: 90, icon: '🛡️' },
      { name: 'Redis (Streams, Caching, Pub/Sub)', level: 92, icon: '🔴' },
      { name: 'Docker & Containers', level: 88, icon: '🐳' },
      { name: 'Ansible & SLURM', level: 85, icon: '📜' },
      { name: 'Enterprise Postfix (DKIM/SPF/DMARC)', level: 92, icon: '✉️' },
      { name: 'AWS (SageMaker, S3, EC2)', level: 85, icon: '☁️' },
      { name: 'Git & GitHub Workflows', level: 95, icon: '🐙' },
      { name: 'Networking (DNS, iptables, TCP/IP)', level: 88, icon: '🌐' }
    ]
  }
];

export const education: EducationItem[] = [
  {
    institution: 'Indian Institute of Technology Bombay (IIT Bombay)',
    period: '2024 – Present',
    degree: 'Master of Technology (M.Tech)',
    specialization: 'Machine Learning',
    standing: 'CPI: 9.03 / 10.0 • Department Rank 1 (DR 1) in Specialization',
    department: 'Dept. of Electrical Engineering / Affiliated with Machine Learning Lab, CSE & BharatGen',
    details: [
      'Awarded Department Rank 1 (DR 1) in Machine Learning specialization with 9.03 CPI.',
      'Active research in Machine Learning Lab (CSE) and BharatGen foundational models.',
      'Serving as System Administrator at Computer Centre, New CSE Building.',
      'Key Coursework: Foundations of Machine Learning, Deep Learning for NLP, Speech & NLP, Cryptocurrency & Blockchain, Algorithms & Complexity, Communication Networks, Digital Signal Processing.'
    ]
  },
  {
    institution: 'Manipal Institute of Technology, Manipal (MIT Manipal)',
    period: '2017 – 2021',
    degree: 'Bachelor of Technology (B.Tech)',
    specialization: 'Electronics & Communication Engineering (ECE) with Data Science Specialization',
    standing: 'First Class with Distinction',
    department: 'Dept. of Electronics & Communication Engineering',
    details: [
      'Graduated with Specialization in Data Science.',
      'Undergraduate research in computer vision and biomedical signal processing.'
    ]
  }
];

export const achievements: AchievementItem[] = [
  {
    title: '🥇 Department Rank 1 (DR 1) • CPI: 9.03',
    badge: 'IIT Bombay',
    description: 'Ranked 1st in Specialization (Machine Learning) at IIT Bombay with a cumulative CPI of 9.03 / 10.0.'
  },
  {
    title: '🎯 GATE 99+ Percentile (Dual Qualification)',
    badge: 'National Exam',
    description: 'Scored 99+ percentile in GATE in both Data Science & Artificial Intelligence (DA) and Computer Science & Information Technology (CS).'
  },
  {
    title: '🏆 JEST All India Rank 58 (Computer Science)',
    badge: 'AIR 58',
    description: 'Secured AIR 58 in JEST (CS), qualifying for PhD/Research interview calls from IISc Bangalore (CSA & CDS departments).'
  },
  {
    title: '⚡ Codeforces Expert (Rating: 1628)',
    badge: 'bombaycoder',
    description: 'Rated 1628 (Expert) on Codeforces under handle bombaycoder. Solved 1,500+ algorithmic problems spanning dynamic programming, trees, segment trees, and graphs.',
    link: 'https://codeforces.com/profile/bombaycoder',
    linkText: 'codeforces.com/profile/bombaycoder ↗'
  },
  {
    title: '⭐ Extraordinary Efforts Award (EE706: DSP)',
    badge: 'CDEEP Archives',
    description: 'Awarded for Extraordinary Efforts in EE706 (Digital Signal Processing) at IIT Bombay; delivered an invited Machine Learning lecture recorded and archived on CDEEP (Centre for Distance Engineering Education Programme).'
  },
  {
    title: '🎸 Live Electric Guitar Solo Performance',
    badge: 'IIT Bombay CSE',
    description: 'Performed a live electric guitar solo of Hotel California (The Eagles) at the annual IIT Bombay CSE Traditional Dinner.'
  }
];