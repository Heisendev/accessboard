# Architecture — AccessBoard

## Objectif du document

Ce document décrit l’architecture front-end de **AccessBoard**.  
Il vise à :
- faciliter l’onboarding des nouveaux développeurs
- garantir la cohérence du code dans le temps
- expliciter les choix techniques et leurs motivations

L’architecture est conçue pour une application React **maintenable**, **scalable** et **accessible**.

---

## Principes directeurs

### 1. Feature-first, pas layer-first
Le code est organisé par **fonctionnalité métier**, et non par type technique.

✅ Favorise la lisibilité  
✅ Réduit les dépendances implicites  
✅ Facilite le refactor et la suppression de features  

❌ Évite les dossiers globaux type `components/`, `services/`, `utils/` fourre-tout

---

### 2. Séparation des responsabilités
- **UI** : rendu, interactions, accessibilité
- **Logique métier** : règles, transformations de données
- **Data fetching** : communication API, cache, erreurs

Chaque couche doit pouvoir évoluer indépendamment.

---

### 3. Server state ≠ UI state
- Les données venant du backend sont gérées via **TanStack Query**
- L’état purement UI reste local (ou contextuel)

👉 Pas de duplication inutile du state.

---

### 4. Accessibilité by design
L’accessibilité est considérée comme une **contrainte d’architecture**, pas une surcouche.

- HTML sémantique prioritaire
- ARIA uniquement si nécessaire
- Navigation clavier systématique
- Focus géré explicitement

---

## Structure des dossiers

```txt
src/
├─ app/
│  ├─ providers/
│  ├─ router/
│  └─ App.tsx
│
├─ features/
│  ├─ actions/
│  │  ├─ components/
│  │  ├─ hooks/
│  │  ├─ services/
│  │  ├─ types.ts
│  │  └─ index.ts
│  └─ dashboard/
│
├─ shared/
│  ├─ components/
│  ├─ hooks/
│  ├─ utils/
│  └─ design-system/
│
└─ main.tsx
```

## Détails par couche
### app/

Responsable de la composition globale de l’application.

Contient :
- providers globaux (QueryClient, router, theme…)
- configuration du routing
- composant racine App.tsx
❌ Ne contient aucune logique métier

---

### features/

Cœur de l’application.

Chaque feature est autonome et peut contenir :
- ses composants
- ses hooks
- ses services API
- ses types

📌 Une feature doit pouvoir être supprimée sans casser le reste de l’app.

---

### shared/

Code mutualisé agnostique du métier.

Contient :
- composants UI génériques
- hooks réutilisables
- utilitaires
- design system

❌ Interdiction d’y mettre de la logique métier spécifique.

---

## Règles de dépendances

`app` → peut dépendre de `features` et `shared`

`features` → peut dépendre de `shared`

`shared` → ne dépend de personne

🚫 Les dépendances inverses sont interdites.

---

## Typage & conventions

- TypeScript en mode strict
- Pas de `any`
- Types métiers définis au plus près de la feature
- Les composants exportent explicitement leurs props

Exemple :

`export type ActionStatus = 'todo' | 'in-progress' | 'blocked' | 'done'`

---

## Gestion du state

- Server state : TanStack Query
- UI state : hooks React (useState, useReducer)
- Derived state : calculé, jamais stocké

## Performance

Les optimisations sont mesurées et justifiées :
- pas de React.memo par défaut
- pas de useCallback systématique
- priorité à la lisibilité

## Tests

Les tests ciblent :

- la logique métier critique
- les parcours utilisateurs
- les composants à forte valeur

Les snapshots sans assertion métier sont évités.

## Ce que cette architecture évite volontairement

- God components
- State global omniprésent
- Couplage UI / API
- Refactors massifs tardifs

## Évolution prévue

Cette architecture permet :

- l’ajout de nouvelles features sans dette immédiate
- l’arrivée d’un vrai backend
- la montée en charge de l’équipe

 **Toute évolution majeure doit être documentée via une décision d’architecture (ADR).**