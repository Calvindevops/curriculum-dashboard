# Linux → AI Developer — 30-Day Roadmap

An interactive curriculum dashboard for learning Linux systems administration and building Claude AI agents in 30 days. Built with React + Vite and deployable to Vercel in one command.

## What's Inside

- **Pre-Start** — WSL2 + Claude Code setup on Windows
- **Week 1** — Linux filesystem, permissions, shell scripting, package management, first Claude agent
- **Week 2** — SSH, networking diagnostics, systemd services, multi-turn conversation agents
- **Week 3** — Structured JSON output, tool use (function calling), Flask REST API, deploy to Render
- **Week 4** — Agent orchestration, RAG basics, GitHub Actions CI/CD, monitoring, capstone project

## Running Locally

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Build & Preview

```bash
npm run build
npm run preview
```

## Deploy to Vercel

```bash
npm install -g vercel
vercel --prod
```

The `vercel.json` at the root handles SPA routing automatically.

## Tech Stack

- React 18 + Vite 5
- Inline styles (no CSS framework dependency)
- `localStorage` for progress persistence
- Deployed as a static SPA

## Project Structure

```
curriculum-dashboard/
├── index.html
├── vercel.json
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx       — React root
    ├── App.jsx        — All curriculum data + UI
    ├── App.css        — Minimal root overrides
    └── index.css      — Global resets
```
