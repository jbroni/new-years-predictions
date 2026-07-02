# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run serve      # Dev server with hot-reload
npm run build      # Production build → dist/
npm run lint       # TSLint
npm run prettier   # Format .ts and .vue files
npm test           # Check formatting (prettier --list-different)
firebase deploy    # Deploy to Firebase Hosting (requires firebase CLI login)
```

## Firebase Setup

The file `environments/firebase.ts` is not in the repo and must be created manually. It exports the Firebase SDK config object obtained from the Firebase Console project settings. `src/db.ts` imports from this path to initialize Firestore.

## Architecture

Vue 2 SPA with Vuefire for real-time Firestore data binding. No Vuex — all state lives in components or Firestore. Anonymous Firebase Auth is required before any route renders (enforced in the Vue Router `beforeEach` guard in `src/routes.ts`).

**Routing:** `/years/` → year list, `/years/:year` → specific year, `/stats/` → charts.

**Component data flow:**
- `Years.vue` binds the `years` Firestore collection and passes it to `YearSelector.vue`
- `YearSelector.vue` reads the `:year` route param and passes the selected year ID to `Year.vue`
- `Year.vue` binds `questions` and `participants` subcollections for that year and passes them to `Predictions.vue`
- `Predictions.vue` contains the core scoring logic: calculates correct answer counts and renders the scoreboard and per-participant prediction table

**Firestore schema:**
```
years/{yearId}/
  questions/{id}  → { question: string, outcome: 1 | 0 | -1 }
  participants/{id} → { id: string, name: string, predictions: boolean[] }
```
`outcome: -1` means undetermined. `predictions[i]` maps to `questions[i]`.

**Components:** Vue class-based components using `vue-class-component` and `vue-property-decorator`. Vuefire bindings use the `@firestore` decorator.

**Persistence:** Selected participant is saved to `localStorage` in `Predictions.vue`.

**Charts:** `Stats.vue` fetches all years and renders bar charts via chart.js + google-palette.
