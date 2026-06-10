"use client";

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
    description:
      "Talk with an intelligent assistant for ideas, explanations, planning, and productivity.",
    icon: MessageSquareText,
  },
  {
    title: "Image Generation",
    description:
      "Create AI images from prompts and save your generations in your workspace.",
    icon: ImageIcon,
  },
  {
    title: "Video Generation",
    description:
      "Generate cinematic video concepts using Google Veo integration.",
    icon: Video,
  },
  {
    title: "Code Assistant",
    description:
      "Get coding help, snippets, debugging support, and project guidance.",
    icon: Code2,
  },
];

const stats = [
  { label: "AI Tools", value: "4+" },
  { label: "Secure Auth", value: "JWT" },
  { label: "Backend", value: "Strapi" },
  { label: "Deploy", value: "Vercel" },
];

const tools = ["Chat", "Image", "Video", "Code", "Dashboard", "Strapi", "Vercel"];

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <style>{`
        @keyframes floatSoft {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-14px); }
        }

        @keyframes floatReverse {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(14px); }
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(28px);
          }
          to {
            opacity: 1;
            transform: translateY(0px);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.94);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes gradientMove {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes orbit {
          from { transform: rotate(0deg) translateX(12px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(12px) rotate(-360deg); }
        }

        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        @keyframes glowPulse {
          0%, 100% {
            opacity: 0.55;
            transform: scale(1);
          }
          50% {
            opacity: 0.9;
            transform: scale(1.08);
          }
        }

        .animate-fade-up {
          opacity: 0;
          animation: fadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .animate-fade-in {
          opacity: 0;
          animation: fadeIn 1s ease forwards;
        }

        .animate-scale-in {
          opacity: 0;
          animation: scaleIn 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .animate-float-soft {
          animation: floatSoft 5s ease-in-out infinite;
        }

        .animate-float-reverse {
          animation: floatReverse 5.5s ease-in-out infinite;
        }

        .animate-gradient {
          background-size: 220% 220%;
          animation: gradientMove 5s ease infinite;
        }

        .animate-orbit {
          animation: orbit 8s linear infinite;
        }

        .animate-marquee {
          animation: marquee 22s linear infinite;
        }

        .animate-glow-pulse {
          animation: glowPulse 4s ease-in-out infinite;
        }

        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-600 { animation-delay: 0.6s; }
        .delay-700 { animation-delay: 0.7s; }
        .delay-800 { animation-delay: 0.8s; }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>

      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="animate-glow-pulse absolute left-1/2 top-[-120px] h-[460px] w-[460px] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
        <div className="animate-float-soft absolute bottom-[-120px] left-[-80px] h-[360px] w-[360px] rounded-full bg-purple-500/15 blur-3xl" />
        <div className="animate-float-reverse absolute right-[-100px] top-1/3 h-[330px] w-[330px] rounded-full bg-blue-500/15 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:72px_72px] opacity-[0.12]" />
      </div>

      <header className="animate-fade-in delay-100 mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <Link href="/" className="group flex items-center gap-2">
          <div className="relative flex size-10 items-center justify-center rounded-2xl border border-border bg-card shadow-sm transition duration-300 group-hover:scale-110">
            <Sparkles className="size-5 text-primary" />
            <span className="absolute inset-0 rounded-2xl bg-primary/20 opacity-0 blur-xl transition group-hover:opacity-100" />
          </div>
          <span className="font-heading text-xl font-bold tracking-tight">
            FluxForge
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          {["Chat", "Image", "Video", "Code"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="relative transition hover:text-foreground"
            >
              {item}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all duration-300 hover:w-full" />
            </Link>
          ))}
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
            className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-lg"
          >
            Get Started
          </Link>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-14 lg:grid-cols-[1.05fr,0.95fr] lg:py-24">
        <div>
          <div className="animate-fade-up delay-200 mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-2 text-sm text-muted-foreground shadow-sm backdrop-blur">
            <WandSparkles className="size-4 text-primary" />
            AI SaaS platform for creators and developers
          </div>

          <h1 className="animate-fade-up delay-300 font-heading text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Build, create, and automate with{" "}
            <span className="animate-gradient bg-gradient-to-r from-primary via-purple-500 to-blue-500 bg-clip-text text-transparent">
              AI tools
            </span>{" "}
            in one workspace.
          </h1>

          <p className="animate-fade-up delay-400 mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            FluxForge combines AI chat, image generation, video generation, and
            code assistance with secure authentication and Strapi-powered
            storage.
          </p>

          <div className="animate-fade-up delay-500 mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/register"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              Start Creating
              <ArrowRight className="size-4 transition duration-300 group-hover:translate-x-1" />
            </Link>

            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-7 py-3 text-sm font-semibold shadow-sm transition duration-300 hover:-translate-y-1 hover:bg-muted hover:shadow-xl"
            >
              <Play className="size-4" />
              Login to Dashboard
            </Link>
          </div>

          <div className="animate-fade-up delay-600 mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="group rounded-2xl border border-border bg-card/60 p-4 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl"
                style={{ animationDelay: `${0.65 + index * 0.08}s` }}
              >
                <p className="text-2xl font-bold transition group-hover:text-primary">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="animate-scale-in delay-400 relative">
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-r from-primary/20 via-purple-500/10 to-blue-500/20 blur-2xl" />

          <div className="animate-float-soft relative overflow-hidden rounded-[2rem] border border-border bg-card/80 p-5 shadow-2xl backdrop-blur">
            <div className="absolute right-8 top-8 size-16 rounded-full border border-primary/20">
              <div className="animate-orbit absolute left-1/2 top-1/2 size-3 rounded-full bg-primary shadow-[0_0_24px_hsl(var(--primary))]" />
            </div>

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
              <div className="rounded-2xl border border-border bg-background/80 p-4 transition duration-300 hover:-translate-y-1 hover:border-primary/40">
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
                <div className="animate-float-reverse rounded-2xl border border-border bg-background/80 p-4 transition duration-300 hover:border-primary/40">
                  <ImageIcon className="mb-4 size-7 text-primary" />
                  <p className="font-semibold">Image</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    FLUX-powered image generation
                  </p>
                </div>

                <div className="animate-float-soft rounded-2xl border border-border bg-background/80 p-4 transition duration-300 hover:border-primary/40">
                  <Video className="mb-4 size-7 text-primary" />
                  <p className="font-semibold">Video</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Veo video generation flow
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-background/80 p-4 transition duration-300 hover:-translate-y-1 hover:border-primary/40">
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

      <section className="animate-fade-up delay-700 border-y border-border bg-card/30 py-5">
        <div className="relative mx-auto max-w-7xl overflow-hidden">
          <div className="animate-marquee flex w-max gap-4 px-6">
            {[...tools, ...tools, ...tools, ...tools].map((tool, index) => (
              <div
                key={`${tool}-${index}`}
                className="rounded-full border border-border bg-background px-5 py-2 text-sm text-muted-foreground shadow-sm"
              >
                {tool}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="animate-fade-up delay-200 mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
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
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="animate-fade-up group rounded-3xl border border-border bg-card/60 p-6 shadow-sm backdrop-blur transition duration-500 hover:-translate-y-2 hover:border-primary/50 hover:shadow-2xl"
                style={{ animationDelay: `${0.25 + index * 0.12}s` }}
              >
                <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-primary/10 transition duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
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

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="animate-scale-in rounded-[2rem] border border-border bg-gradient-to-r from-primary/10 via-purple-500/10 to-blue-500/10 p-8 text-center shadow-xl backdrop-blur md:p-12">
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to launch your AI workspace?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-muted-foreground">
            Login or create an account to access chat, image generation, video
            generation, and coding tools.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/register"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              Create Account
              <ArrowRight className="size-4 transition group-hover:translate-x-1" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-full border border-border bg-background px-7 py-3 text-sm font-semibold shadow-sm transition duration-300 hover:-translate-y-1 hover:bg-muted hover:shadow-xl"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
