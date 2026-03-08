# Mobi3D — MVP

> Plateforme de valorisation du mobilier professionnel d'entreprise avec modélisation 3D.

![Stack](https://img.shields.io/badge/React-18-blue) ![Stack](https://img.shields.io/badge/TypeScript-5-blue) ![Stack](https://img.shields.io/badge/Vite-5-purple) ![Stack](https://img.shields.io/badge/Tailwind-3-cyan) ![Stack](https://img.shields.io/badge/R3F-8-green)

## 🚀 Démarrage rapide

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer le serveur de développement
npm run dev

# 3. Build de production
npm run build
```

## 📁 Structure du projet

```
src/
├── components/
│   ├── layout/          # Sidebar, AppLayout
│   ├── three/           # Scene3D (React Three Fiber)
│   └── ui/              # StateBadge, Stepper
├── data/
│   └── furniture.ts     # Mock data & constantes
├── hooks/
│   └── useAuth.ts       # Authentification (localStorage)
├── pages/
│   ├── LandingPage.tsx  # Page d'accueil publique
│   ├── LoginPage.tsx    # Authentification
│   ├── DashboardPage.tsx
│   ├── CataloguePage.tsx
│   ├── ScannerPage.tsx  # Wizard 4 étapes
│   └── ViewerPage.tsx   # Visualiseur 3D
├── styles/
│   └── globals.css      # Tailwind + styles globaux
├── types/
│   └── index.ts         # Types TypeScript
├── App.tsx              # Routes (React Router)
└── main.tsx             # Point d'entrée
```

## 🔑 Connexion démo

- **Email** : `demo@mobi3d.fr`
- **Mot de passe** : `demo2026`

## 🎨 Design System

- **Fond** : `#0a0a0a` (noir profond)
- **Accent** : `#c8e630` (lime/chartreuse)
- **Surfaces** : `#141414` / `#1a1a1a`
- **Typo** : DM Sans + JetBrains Mono

## 📦 Stack technique

| Outil             | Usage                          |
| ----------------- | ------------------------------ |
| React 18          | UI Framework                   |
| TypeScript 5      | Type safety                    |
| Vite 5            | Build tool                     |
| React Router 6    | Routing SPA                    |
| Tailwind CSS 3    | Styling                        |
| React Three Fiber | Rendu 3D (Three.js)            |
| @react-three/drei | Helpers 3D (OrbitControls etc) |
| Lucide React      | Icônes                         |

## 📋 Fonctionnalités MVP

1. **Landing page** — Présentation des valeurs du projet
2. **Authentification** — Login avec localStorage
3. **Dashboard** — Stats et accès rapide
4. **Catalogue** — Liste filtrable avec prix IA
5. **Scanner** — Wizard 4 étapes (Photos → Métadonnées → Traitement 3D → Fiche)
6. **Visualiseur 3D** — Scène interactive avec sélection de meubles
