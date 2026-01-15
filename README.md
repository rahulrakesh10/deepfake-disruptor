# Deep Fake Disruptor

A React + TypeScript + Vite application for real‑time detection, monitoring, and reporting of deepfakes. This repo contains a lightweight frontend with modular components for live feeds, analysis, scoring, and threat visualization.

> If you’re looking for the **backend / model service**, plug your API base URL into the fetch helpers under `src/lib` (see _Integrations_ below) or replace them with your own data source.

---

## ✨ Highlights

- **Modular UI:** Components for `LiveFeed`, `AnalysisPanel`, `RealityScore`, and `ThreatMap` that you can compose into pages.
- **Realtime-ish UX:** Designed to poll/stream results from a backend (WebSocket or HTTP polling).
- **TypeScript-first:** Strong types for data contracts and component props.
- **Fast dev loop:** Vite-powered HMR.
- **Lints & formatting:** ESLint is preconfigured (`eslint.config.js`).

---

## 🧭 Project Structure

```
.
├─ public/                 # Static assets served as-is
├─ src/
│  ├─ components/
│  │  ├─ ui/              # Low-level UI primitives (buttons, panels, etc.)
│  │  ├─ AnalysisPanel.tsx
│  │  ├─ Dashboard.tsx
│  │  ├─ LiveFeed.tsx
│  │  ├─ RealityScore.tsx
│  │  └─ ThreatMap.tsx
│  ├─ hooks/              # Custom React hooks (data fetching, streaming, etc.)
│  ├─ lib/                # Api clients, util fns, types
│  ├─ pages/              # Route-level pages (e.g., /dashboard)
│  ├─ App.css
│  ├─ App.tsx
│  ├─ index.css
│  ├─ main.tsx
│  └─ vite-env.d.ts
├─ index.html
├─ eslint.config.js
├─ components.json        # (Optional) UI system config
├─ package.json
├─ package-lock.json
├─ bun.lockb              # If you prefer Bun instead of npm
└─ README.md
```

> **Note:** The exact file set may evolve. The tree above mirrors the screenshot you provided.

---

## 🚀 Quickstart

### Prerequisites
- **Node.js** 18+ (recommended 20+)
- **npm** 9+ (or **Bun** if you prefer — repo contains `bun.lockb`)

### Install
```bash
# with npm
npm install

# or with Bun
bun install
```

### Run Dev Server
```bash
# npm
npm run dev

# bun
bun run dev
```
Vite will print a local URL (typically `http://localhost:5173`).

### Build & Preview
```bash
# npm
npm run build
npm run preview

# bun
bun run build
bun run preview
```

### Lint
```bash
# npm
npm run lint

# bun
bun run lint
```

> Scripts above assume standard Vite defaults. If your `package.json` differs, follow your existing script names.

---

## 🧩 Key Components

- `components/Dashboard.tsx` — Top-level layout that stitches together the live feed, scoring, and threat map.
- `components/LiveFeed.tsx` — Displays incoming media/events. Wire this to your WebSocket or polling source.
- `components/AnalysisPanel.tsx` — Renders model inferences, explanations, and metadata (e.g., heatmaps, spectrograms).
- `components/RealityScore.tsx` — Shows a trust/likelihood score, confidence intervals, or labels.
- `components/ThreatMap.tsx` — Visualizes incidents by geography or cluster.

Each component is intentionally **headless-ish**: pass in props or connect them to your store/fetcher inside `pages/` or `lib/`.

---
