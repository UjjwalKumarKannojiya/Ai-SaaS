# FluxForge

FluxForge is an AI workspace for generating images, video, and conversational code assistance — built with Next.js, TypeScript, Tailwind CSS, and a Strapi backend.

## Features

- **Chat** — streaming conversations powered by Google Gemini
- **Code** — same workspace UI tuned for software tasks
- **Image** — prompt-to-image generation with a personal gallery
- **Video** — short-form video generation from text prompts
- **Dashboard** — overview of your creative tools and activity

## Getting Started

```bash
cd frontend
npm install
cp .env.example .env.local   # if present; otherwise create .env
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The Strapi backend lives in `../strapi-ai-saas`. See [SETUP_NOTES.md](../SETUP_NOTES.md) for full stack instructions.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Run production build |
| `npm run lint` | ESLint |

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GOOGLE_GENERATIVE_AI_API_KEY` | Yes | Google Gemini API key |
| `NEXT_PUBLIC_STRAPI_URL` | Yes | Strapi base URL (default `http://localhost:1337`) |
| `STRAPI_API_TOKEN` | Yes | Strapi API token for authenticated requests |

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4 with a custom monochrome + teal design system
- Motion (Framer Motion API)
- Lucide React icons
- Vercel AI SDK + Google Generative AI

## License

MIT
