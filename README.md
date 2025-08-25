# LogSaaS Lite

A lightweight SaaS-style **logging platform** with alerting, API keys, and dashboards.

## 📂 Project Structure

```
logsaas-lite/
 ├─ apps/
 │   ├─ api/   # backend (Node + Express + MongoDB)
 │   └─ web/   # frontend (Next.js + Tailwind + shadcn/ui)
 ├─ packages/  # shared config/tsconfig
 ├─ CONTEXT.md # full system context and workflows
 └─ README.md  # this file
```

## 🚀 Features
- Multi-tenant user authentication (Firebase / JWT)
- API key management
- Log ingestion endpoint
- Dashboard UI with charts + filters
- Dark/light mode support
- Alerting rules + worker (email/slack integration)

## 🛠️ Getting Started

### Backend
```bash
cd apps/api
pnpm install
pnpm dev
```
Runs Express API on [http://localhost:4000](http://localhost:4000).

### Frontend
```bash
cd apps/web
pnpm install
pnpm dev
```
Runs Next.js app on [http://localhost:3000](http://localhost:3000).

## 📦 Tech Stack
- **Backend**: Node.js, Express, MongoDB, Mongoose, pino
- **Frontend**: Next.js, React, TailwindCSS, shadcn/ui, Chart.js, framer-motion
- **Auth**: Firebase / JWT
- **DevOps**: Docker-ready, pnpm monorepo, turborepo

## 👥 Team Workflow
- Use `CONTEXT.md` as the source of truth
- Each teammate picks items from the backlog
- Commit frequently with clear messages

---
Happy building! 🚀
