const DATA = {
  skills: {
    langages: [
      { name: "C", level: "Expert", modes: ["dev", "linux"] },
      { name: "C++", level: "Expert", modes: ["dev", "linux"] },
      { name: "Python", level: "Confirmé", modes: ["dev"] },
      { name: "Bash", level: "Confirmé", modes: ["linux"] },
      { name: "SQL", level: "Intermédiaire", modes: ["dev"] },
      { name: "Java", level: "Intermédiaire", modes: ["dev"] },
      { name: "Elisp", level: "Intermédiaire", modes: ["linux"] }
    ],
    frameworks: [
      { name: "Qt", level: "Confirmé", modes: ["dev"] },
      { name: "Boost", level: "Confirmé", modes: ["dev"] },
      { name: "GLib", level: "Intermédiaire", modes: ["linux"] }
    ],
    env: [
      { name: "Linux embarqué", level: "Expert", modes: ["linux"] },
      { name: "Windows", level: "Confirmé", modes: ["dev"] },
      { name: "Linux", level: "Expert", modes: ["linux"] }
    ],
    concepts: [
      { name: "Multithreading", level: "Expert", modes: ["dev"] },
      { name: "IPC", level: "Expert", modes: ["dev", "linux"] },
      { name: "Réseaux", level: "Confirmé", modes: ["dev"] },
      { name: "Systèmes distribués", level: "Confirmé", modes: ["dev"] }
    ],
    tools: [
      { name: "Git", level: "Expert", modes: ["dev"] },
      { name: "Docker", level: "Confirmé", modes: ["dev"] },
      { name: "CMake", level: "Expert", modes: ["dev"] },
      { name: "GCC", level: "Expert", modes: ["dev", "linux"] }
    ],
    hardware: [
      { name: "FPGA", level: "Intermédiaire", modes: ["3d"] },
      { name: "Arduino/STM32", level: "Confirmé", modes: ["3d"] },
      { name: "FreeCAD", level: "Confirmé", modes: ["3d"] },
      { name: "Impression 3D", level: "Confirmé", modes: ["3d"] }
    ]
  },

  experiences: [
    {
      id: "exp1",
      title: "Ingénieur logiciel embarqué C/C++ – Secteur Défense",
	period: "2018 - 2022 (5 ans)",
      summary: "Systèmes critiques embarqués",
	modes: ["linux","dev"],
      details: "- Développement logiciel embarqué critique en C/C++<br>- Intégration sur systèmes Linux embarqués<br>- Debug bas niveau et analyse système<br>- Optimisation performance et robustesse<br>- Collaboration équipes hardware et système<br>- Gestion d’équipe (3 personnes)"
    },
    {
      id: "exp2",
      title: "Ingénieur développement logiciel C++ – Plateforme de gestion de données distribuées",
	period: "2022 - 2023 (18 mois)",
      summary: "Architecture distribuée",
	modes: ["linux", "dev"],
      details: "- Développement C++ d’une plateforme de gestion et synchronisation de données distribuées<br>- Réplication temps réel multi-serveurs<br>- Traitement et validation de données (SQLite)<br>- Migration Windows → Linux<br>- Intégration et déploiement sur IBM i (AS/400)"
    },
    {
      id: "exp3",
      title: "Fondateur – Conception hardware et système informatique",
      period: "2024–2026 (2 ans)",
      summary: "Hardware + CAO",
	modes: ["linux", "3d"],
	details: "Conception et développement d’un système informatique complet orienté hardware (ordinateur portable sur mesure).<br>Travail sur l’architecture matérielle, le choix des composants et la conception système.<br>Prototypage et validation via CAO (FreeCAD) et impression 3D (Prusa XL).<br>Veille technologique et définition des choix techniques."
    }
  ],

  projects: [
    {
      id: "p1",
      title: "Laptop modulaire",
      summary: "Projet hardware",
      modes: ["3d"],
      details: "CAO + architecture modulaire."
    },
    {
      id: "p2",
      title: "Plateforme C++ distribuée",
      summary: "Système distribué",
      modes: ["dev"],
      details: "Réseau + SQLite + performance."
    },
    {
      id: "p3",
      title: "Infrastructure Linux",
      summary: "Homelab avancé",
      modes: ["linux"],
      details: "Containers + automation."
    }
  ]
};
