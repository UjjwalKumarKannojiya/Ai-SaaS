// Header component for FluxForge UI
"use client"

import * as React from "react"
import Link from "next/link"
import { PanelTop } from "lucide-react"
import { cn } from "@/lib/utils"

export function Header({ className, ...props }: React.ComponentPropsWithoutRef<"header">) {
  return (
    <header
      className={cn(
        "sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur-sm",
        className
      )}
      {...props}
    >
      <Link href="/" className="flex items-center space-x-2">
        {/* Logo could be an SVG or text */}
        <PanelTop className="h-6 w-6 text-primary" />
        <span className="text-xl font-bold text-primary-foreground">FluxForge</span>
      </Link>
      {/* Placeholder for future command palette or user menu */}
      <div className="flex items-center space-x-3">
        {/* Add any header actions here */}
      </div>
    </header>
  )
}
