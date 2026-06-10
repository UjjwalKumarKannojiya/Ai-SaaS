"use client"

import Link from "next/link";
import { motion } from "motion/react";


import {
  MessageCircle,
  Code,
  Image as ImageIcon,
  Film,
  ArrowRight,
} from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const sections = [
  {
    href: "/chat",
    title: "Chat",
    description:
      "Ask questions, brainstorm ideas, and get clear answers in a natural back-and-forth.",
    icon: MessageCircle,
    accent: {
      iconBg: "bg-primary/10",
      iconFg: "text-primary",
      hover: "hover:bg-primary/[0.02] hover:border-primary/50",
    },
  },
  {
    href: "/code",
    title: "Code",
    description:
      "Generate snippets, refactor logic, and debug faster with an AI pair programmer.",
    icon: Code,
    accent: {
      iconBg: "bg-primary/10",
      iconFg: "text-primary",
      hover: "hover:bg-primary/[0.02] hover:border-primary/50",
    },
  },
  {
    href: "/image",
    title: "Image",
    description:
      "Turn prompts into visuals—concepts, mockups, and assets for your projects.",
    icon: ImageIcon,
    accent: {
      iconBg: "bg-primary/10",
      iconFg: "text-primary",
      hover: "hover:bg-primary/[0.02] hover:border-primary/50",
    },
  },
  {
    href: "/video",
    title: "Video",
    description:
      "Turn prompts into short generated clips and keep your video history in one place.",
    icon: Film,
    accent: {
      iconBg: "bg-primary/10",
      iconFg: "text-primary",
      hover: "hover:bg-primary/[0.02] hover:border-primary/50",
    },
  },
] as const;

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function DashboardPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mx-auto w-full max-w-4xl space-y-8"
    >
      <div>
        <p className="text-xs font-semibold tracking-wider text-primary uppercase mb-2">
          Overview
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          Welcome to FluxForge
        </h1>
        <p className="mt-2 text-lg text-muted-foreground max-w-2xl">
          Your creative AI workspace. Select a tool below to start generating, editing, and transforming content.
        </p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {sections.map(({ href, title, description, icon: Icon, accent }) => (
          <motion.div variants={item} key={href}>
            <Link
              href={href}
              className="block group outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl h-full"
            >
              <Card
                className={cn(
                  "h-full transition-all duration-300 border-border/50",
                  accent.hover
                )}
              >
                <CardHeader className="flex flex-col gap-4 p-6">
                  <div className="flex items-center justify-between">
                    <span
                      className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-xl transition-transform group-hover:scale-110 duration-300",
                        accent.iconBg,
                        accent.iconFg
                      )}
                    >
                      <Icon className="h-6 w-6" aria-hidden />
                    </span>
                    <ArrowRight className="h-5 w-5 text-muted-foreground opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
                  </div>
                  <div className="space-y-1.5">
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {title}
                    </CardTitle>
                    <CardDescription className="text-sm leading-relaxed">
                      {description}
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
