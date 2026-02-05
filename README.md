![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue)
![Tests](https://img.shields.io/badge/Tests-Jest%20%2B%20RTL-green)
![Accessibility](https://img.shields.io/badge/Accessibility-WCAG-informational)

⚠️ Ce projet est un projet de référence Frontend.
Il ne vise pas l’exhaustivité fonctionnelle mais la qualité architecturale.

# Action Board

Action Board est une application React permettant de gérer une liste d’actions (CRUD),
conçue comme un projet de référence pour une architecture Frontend moderne, scalable
et orientée qualité.

## 🎯 Objectifs du projet

- Démontrer une architecture Frontend **maintenable et testable**
- Appliquer les bonnes pratiques React (hooks, séparation des responsabilités)
- Illustrer un usage avancé de **React Query**
- Mettre en place un **design system léger** basé sur des design tokens
- Servir de base de discussion pour un rôle de **Lead Frontend React**

---

## 🧱 Stack technique

- **React 18**
- **TypeScript**
- **Vite**
- **React Query (@tanstack/react-query)**
- **Tailwind CSS**
- **Jest + Testing Library**
- **Mock API (fetch)**

---

## 🚀 Installation

```bash
npm install
npm run dev
```

### Tests

```bash
npm run test
```

---

## 🗂️ Structure du projet

```
src/
├── app/                # Setup global (providers, query client)
├── features/           # Organisation par domaine fonctionnel
│   └── actions/
│       ├── api/
│       ├── hooks/
│       ├── components/
│       ├── types.ts
│       └── index.ts
├── components/         # Composants UI partagés
├── styles/             # Design tokens & styles globaux
├── test/               # Setup et helpers de tests
└── main.tsx
```

---

## 🧠 Principes clés

- **Feature-first architecture**
- **Données server-side** via React Query
- **Aucune logique métier** dans les composants UI
- **Design tokens** comme contrat design/code
- **Accessibilité by default**

---

## ♿ Accessibilité

- Utilisation des rôles ARIA lorsque nécessaire (`role="alert"`)
- Composants contrôlés et focusables
- Couleurs et contrastes centralisés via design tokens

---

## 📄 Documentation

Voir [ARCHITECTURE.md](Architecture.md) — décisions techniques détaillées

---

## 🧪 Philosophie de test

- Tests orientés comportement utilisateur
- Mock des appels réseau
- Aucun test d'implémentation interne

---

## 🔮 Évolutions possibles

- Authentification
- Pagination / infinite scroll
- Dark mode
- Internationalisation
- Backend réel

---

# 🏗️ Architecture

Ce document décrit les choix architecturaux du projet Action Board,
leurs motivations et les alternatives envisagées.

---

## 🎯 Vision

L'architecture vise à :

- Séparer clairement **UI / logique métier / data**
- Favoriser la **scalabilité par feature**
- Réduire le couplage
- Améliorer la testabilité
- Faciliter l'onboarding développeur

---

## 🧩 Organisation par feature

Chaque domaine fonctionnel est isolé dans un dossier `features/`.

```
features/actions/
├── api/          # appels réseau
├── hooks/        # logique métier
├── components/   # UI spécifique
├── types.ts      # modèles de données
└── index.ts      # API publique de la feature
```

### Pourquoi ?

- Limite les dépendances croisées
- Facilite le découpage d'équipe
- Permet de supprimer une feature sans effet de bord

---

## 🔌 Couche API

Les appels réseau sont isolés dans une couche dédiée.

**Exemple :**

```typescript
actionsApi.updateAction(id, data)
```

### Bénéfices

- Mocking simplifié
- Centralisation des erreurs
- Indépendance vis-à-vis du backend

---

## 🔁 Gestion des données serveur

**Choix : React Query**

Les données distantes sont considérées comme une source de vérité serveur.

### Pourquoi React Query ?

- Cache intelligent
- Synchronisation automatique
- États (loading, error, success) intégrés
- Support natif des optimistic updates

> **👉 Les données ne sont jamais stockées dans un state local.**

---

## 🧠 Hooks dédiés

La logique métier est encapsulée dans des hooks spécifiques.

**Exemples :**

- `useActionsQuery`
- `useUpdateAction`

### Pourquoi un hook dédié ?

- Séparation UI / logique
- Réutilisabilité
- Testabilité
- Lisibilité du composant

---

## ⚠️ Gestion des erreurs

Les erreurs critiques sont exposées via des composants accessibles.

```html
<div role="alert">
  Votre message d'erreur
</div>
```

### Pourquoi `role="alert"` ?

- Annonce automatique par les lecteurs d'écran
- Feedback immédiat pour l'utilisateur
- Conforme WCAG

---

## 🎨 Design System & Design Tokens

Les styles sont basés sur des design tokens sémantiques.

**Exemples :**

- `color-text-primary`
- `space-md`
- `radius-lg`

### Source de vérité

- Tokens définis en CSS
- Consommés via Tailwind

### Avantages

- Thématisation facilitée
- Suppression des valeurs magiques
- Cohérence visuelle globale

---

## 🧪 Tests

### Approche

- Tests orientés usage réel
- React Testing Library
- Mock des appels API

### Ce qui n'est pas testé

- Détails d'implémentation
- Hooks internes de React Query

---

## ♿ Accessibilité

- Rôles ARIA utilisés avec parcimonie
- Composants contrôlés
- Styles compatibles dark mode et contrastes élevés

---

## 🔄 Scalabilité

Cette architecture permet :

- Ajout de nouvelles features sans refactor global
- Migration backend progressive
- Introduction de SSR / RSC à terme

---

## 🏁 Conclusion

Cette architecture privilégie la clarté, la maintenabilité
et la robustesse plutôt que l'optimisation prématurée.

Elle est conçue pour évoluer avec une équipe et un produit réel.