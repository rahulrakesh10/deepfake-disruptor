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

## 🔌 Integrations (Backend/API)

Place API helpers and types in `src/lib`. A simple pattern is:

```ts
// src/lib/api.ts
export type Detection = {
  id: string;
  source: string;
  score: number;        // 0..1
  label: 'real' | 'fake' | 'suspect';
  createdAt: string;    // ISO timestamp
  metadata?: Record<string, unknown>;
};

const BASE_URL = import.meta.env.VITE_API_BASE ?? 'http://localhost:8000';

export async function fetchLatestDetections(): Promise<Detection[]> {
  const res = await fetch(`${BASE_URL}/detections`);
  if (!res.ok) throw new Error('Failed to fetch detections');
  return res.json();
}
```

Then consume in a component or hook:

```ts
// src/hooks/useDetections.ts
import { useEffect, useState } from 'react';
import { fetchLatestDetections, Detection } from '@/lib/api';

export function useDetections(pollMs = 3000) {
  const [data, setData] = useState<Detection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let timer: number | undefined;
    async function tick() {
      try {
        const d = await fetchLatestDetections();
        setData(d);
        setError(null);
      } catch (e) {
        setError(e as Error);
      } finally {
        setLoading(false);
        timer = window.setTimeout(tick, pollMs);
      }
    }
    tick();
    return () => timer && clearTimeout(timer);
  }, [pollMs]);

  return { data, loading, error };
}
```

Add an env var in a `.env` file (not committed) at project root:

```
VITE_API_BASE=https://your-backend.example.com
```

---

## 🧱 Routing (optional)

If you use `react-router` or similar, keep route-level views in `src/pages/`, e.g.:

```
/pages
  DashboardPage.tsx
  FeedPage.tsx
  IncidentsPage.tsx
```

Wire them in `App.tsx`.

---

## ✅ Testing (suggested)

Place component tests under `src/__tests__/` or alongside each component. For Vite projects, a common stack is **Vitest + Testing Library**.

Example dev deps:
```bash
npm i -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

---

## 🧭 Coding Standards

- **TypeScript everywhere** for component APIs and data models.
- Maintain small, focused components. Push shared UI to `components/ui`.
- Keep fetch logic in `hooks/` or `lib/` (not inside JSX when possible).
- Run `npm run lint` before opening a PR.

---

## 🔒 Ethics & Safety

This project’s goal is to **detect** synthetic media and help users make informed decisions. Do not use it to target individuals, suppress legitimate content, or violate privacy. Always disclose limitations and potential false positives/negatives.

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feat/my-feature`
3. Commit: `git commit -m "feat: add my feature"`
4. Push: `git push origin feat/my-feature`
5. Open a PR

---

## 📄 License

MIT — see `LICENSE` (or choose the license that fits your needs).

---

## 🧰 Troubleshooting

- **Blank page / HMR issues:** Clear browser cache or delete `node_modules` and reinstall.
- **CORS / network failures:** Check `VITE_API_BASE` and your backend CORS policy.
- **Type errors:** Ensure Node/TS versions align; run `npm run lint` to surface issues.
- **Bun vs npm:** Use one tool consistently (delete the other lockfile if your team standardizes on one).
