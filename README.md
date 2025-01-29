# 📱 Ionic React Task Manager

## 📝 Description

Une application mobile moderne de gestion de tâches construite avec Ionic et React. Elle offre une interface utilisateur élégante et réactive pour gérer vos tâches quotidiennes, avec des fonctionnalités de filtrage, tri et organisation avancées.

## ✨ Fonctionnalités principales

- 📋 Gestion complète des tâches (CRUD)
- 🏷️ Organisation par labels, statuts et priorités
- 📱 Interface responsive et mobile-first
- 💾 Stockage local persistant
- 🔍 Recherche et filtrage avancés
- 📊 Vue tabulaire interactive
- ✨ UI moderne avec Tailwind CSS et shadcn/ui

## 🗂️ Structure du projet

```
.
├── src/
│ ├── components/
│ │ ├── data-table/ # Composants de table de données
│ │ ├── modal/ # Dialogues modaux
│ │ └── ui/ # Composants UI réutilisables
│ ├── lib/
│ │ ├── model/ # Modèles de données
│ │ ├── services/ # Services métier
│ │ └── context/ # Contextes React
│ └── pages/
│ ├── Tasks.tsx # Page principale des tâches
```

## 🚀 Installation et lancement

### Prérequis

- Node.js
- npm ou yarn
- Ionic CLI (`npm install -g @ionic/cli`)

### Commandes

```bash
# Installation des dépendances
npm install

# Lancement en mode développement web
ionic serve

# Lancement sur Android
ionic capacitor run android

# Lancement sur iOS
ionic capacitor run ios
```

## 🛠️ Technologies utilisées

- ⚛️ React
- 🔋 Ionic Framework
- 💾 Ionic Storage
- 🎨 Tailwind CSS
- 🧰 shadcn/ui

## 🎯 Fonctionnalités de gestion des tâches

- ✏️ Création/édition de tâches
- 🏷️ Attribution de labels
- 🔥 Gestion des priorités
- 📊 Statuts personnalisables
- 🔍 Filtrage multi-critères
- 📱 Interface tactile optimisée

## 🛣️ Roadmap

- [x] Mode hors ligne
- [ ] Synchronisation cloud
- [x] Notifications push
- [ ] Thèmes personnalisables
- [ ] Support des pièces jointes

## 📄 Licence

MIT
