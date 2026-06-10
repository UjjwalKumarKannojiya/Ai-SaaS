import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Code2,
  ImageIcon,
  MessageSquareText,
  Play,
  ShieldCheck,
  Sparkles,
  Video,
  WandSparkles,
  Zap,
} from "lucide-react";

const features = [
  {
    title: "AI Chat",
    description: "Talk with an intelligent assistant for ideas, explanations, and productivity.",
    icon: MessageSquareText,
  },
  {
    title: "Image Generation",
    description: "Create AI images from prompts and save your generations in your workspace.",
    icon: ImageIcon,
  },
  {
    title: "Video Generation",
    description: "Generate cinematic video concepts using Google Veo integration.",
    icon: Video,
  },
  {
    title: "Code Assistant",
    description: "Get coding help, snippets, and project guidance inside one SaaS workspace.",
    icon: Code2,
  },
];

const stats = [
  { label: "AI Tools", value: "4+" },
  { label: "Secure Auth", value: "JWT" },
  { label: "Backend", value: "Strapi" },
  { label: "Deploy", value: "Vercel" },
];

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[320px] w-[320px] rounded-full bg-purple-500/10 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-[280px] w-[280px] rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex size-10 items-center justify-center rounded-2xl border border-border bg-card shadow-sm">
            <Sparkles className="size-5 text-primary" />
          </div>
          <span className="font-heading text-xl font-bold tracking-tight">
            FluxForge
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          <Link href="/chat" className="transition hover:text-foreground">
            Chat
          </Link>
          <Link href="/image" className="transition hover:text-foreground">
            Image
          </Link>
          <Link href="/video" className="transition hover:text-foreground">
            Video
          </Link>
          <Link href="/code" className="transition hover:text-foreground">
            Code
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90"
          >
            Get Started
          </Link>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-[1.05fr,0.95fr] lg:py-24">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-2 text-sm text-muted-foreground shadow-sm backdrop-blur">
            <WandSparkles className="size-4 text-primary" />
            AI SaaS platform for creators and developers
          </div>

          <h1 className="font-heading text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Build, create, and automate with{" "}
            <span className="bg-gradient-to-r from-primary via-purple-500 to-blue-500 bg-clip-text text-transparent">
              AI tools
            </span>{" "}
            in one workspace.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            FluxForge combines AI chat, image generation, video generation, and
            code assistance with secure authentication and Strapi-powered
            storage.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/register"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90"
            >
              Start Creating
              <ArrowRight className="size-4 transition group-hover:translate-x-1" />
            </Link>

            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-7 py-3 text-sm font-semibold shadow-sm transition hover:bg-muted"
            >
              <Play className="size-4" />
              Login to Dashboard
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-border bg-card/60 p-4 shadow-sm backdrop-blur"
              >
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-r from-primary/20 via-purple-500/10 to-blue-500/20 blur-2xl" />

          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card/80 p-5 shadow-2xl backdrop-blur">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">AI Workspace</p>
                <p className="text-xs text-muted-foreground">
                  Live generation dashboard
                </p>
              </div>
              <div className="flex items-center gap-1 rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground">
                <span className="size-2 rounded-full bg-green-500" />
                Online
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-2xl border border-border bg-background/80 p-4">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
                    <Bot className="size-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Prompt Engine</p>
                    <p className="text-xs text-muted-foreground">
                      Generate content with AI
                    </p>
                  </div>
                </div>
                <div className="rounded-xl border border-border bg-muted/40 p-3 text-sm text-muted-foreground">
                  “Create a cinematic neon city image with futuristic lighting…”
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-border bg-background/80 p-4">
                  <ImageIcon className="mb-4 size-7 text-primary" />
                  <p className="font-semibold">Image</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    FLUX-powered image generation
                  </p>
                </div>

                <div className="rounded-2xl border border-border bg-background/80 p-4">
                  <Video className="mb-4 size-7 text-primary" />
                  <p className="font-semibold">Video</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Veo video generation flow
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-background/80 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="size-6 text-primary" />
                    <div>
                      <p className="text-sm font-semibold">Secure Workspace</p>
                      <p className="text-xs text-muted-foreground">
                        Authenticated dashboard with saved generations
                      </p>
                    </div>
                  </div>
                  <Zap className="size-5 text-yellow-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Features
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              Everything your AI SaaS needs
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-muted-foreground">
            Designed as a full-stack AI SaaS project with frontend, backend,
            authentication, database records, and deployment-ready structure.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-3xl border border-border bg-card/60 p-6 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-primary/10 transition group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="size-6" />
                </div>
                <h3 className="font-heading text-lg font-semibold">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
