# Cognivolt AI (v2)

An AI assistant that answers questions about Indian Standards and BIS (Bureau of Indian Standards) services, powered by the Google Gemini API.

**Live demo:** https://cognivoltai.freebuff.app/

## What it does

- Chat interface with conversation history, so follow-up questions keep their context
- Answers grounded in BIS / Indian Standards reference content
- Stays on topic: questions outside its scope are declined
- Multilingual responses
- Product-to-standard recommendations
- Guidance on finding testing labs and on consumer verification and complaints

## Versions

| Version | Description | Repo |
|---|---|---|
| v1 | Python + Streamlit prototype | [Cognivolt_AI](https://github.com/govi12/Cognivolt_AI) |
| v2 (this repo) | Redesigned web app with a polished UI | bis-cognivolt-ai |

v2 started from the v1 Python code and was rebuilt as a full web app with a more polished interface.

## Tech stack

- React 19 + TypeScript, built with Vite
- React Router v7
- Tailwind CSS v4, shadcn/ui, Lucide icons, Framer Motion
- Convex (backend and database)
- Google Gemini API (answer generation)

## Environment variables

See `.env.example` for the frontend variables. The Gemini API key is stored as a secret in the Convex backend's environment settings and is never committed to this repo.

## Run locally

```bash
bun install
bun run dev
```

You'll need your own Convex project and Gemini API key to run the full app. The live demo above is the easiest way to try it.

## Disclaimer

This is an independent student project and is not affiliated with the Bureau of Indian Standards. AI-generated answers can be inaccurate, so please verify anything important with official BIS sources.

## About

Built by Govi (Goveekshith Telu), a first-year CSE student at VIT-AP, using AI-assisted development tools: Replit Agent for v1 and Freebuff for v2.
