"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  CodeIcon,
  ImageIcon,
  LogOutIcon,
  MessageCircle,
  PanelTop,
  User,
  VideoIcon,
} from "lucide-react";
import { logoutAction } from "@/actions/auth";
import { ModeToggle } from "../ui/mode-toggle";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const nav = [
  { href: "/chat", label: "Chat", icon: MessageCircle },
  { href: "/code", label: "Code", icon: CodeIcon },
  { href: "/image", label: "Image", icon: ImageIcon },
  { href: "/video", label: "Video", icon: VideoIcon },
];

type DashboardShellProps = {
  userEmail: string;
  children: ReactNode;
};

export function DashboardShell({ userEmail, children }: DashboardShellProps) {
  const pathname = usePathname();

  return (
    <>
      <Sidebar variant="sidebar">
        <SidebarHeader className="p-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-foreground transition-colors"
          >
            <span className="flex h-8 w-8 items-center justify-center bg-primary text-primary-foreground rounded-md">
              <PanelTop className="h-5 w-5" />
            </span>
            <span className="font-bold text-lg tracking-tight">
              FluxForge
            </span>
          </Link>
        </SidebarHeader>

        <SidebarContent className="px-2">
          <SidebarMenu>
            {nav.map(({ href, label, icon: Icon }) => {
              const active =
                pathname === href || pathname.startsWith(`${href}/`);
              return (
                <SidebarMenuItem key={href}>
                  <SidebarMenuButton
                    isActive={active}
                    render={<Link href={href} aria-current={active ? "page" : undefined} />}
                  >
                    <Icon />
                    <span>{label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter className="p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-medium text-muted-foreground uppercase">
              Theme
            </span>
            <ModeToggle />
          </div>

          <div className="flex min-w-0 items-center gap-2 rounded-md border border-border bg-background p-2">
            <span className="flex h-8 w-8 items-center justify-center bg-muted text-foreground rounded-md">
              <User className="h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
                Signed in
              </p>
              <p className="truncate text-xs text-foreground" title={userEmail}>
                {userEmail}
              </p>
            </div>
          </div>

          <form action={logoutAction} className="w-full">
            <Button
              type="submit"
              variant="outline"
              className="h-9 w-full gap-2"
            >
              <LogOutIcon className="h-4 w-4" />
              Log out
            </Button>
          </form>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <main className="flex-1 p-6 md:p-8">{children}</main>
      </SidebarInset>
    </>
  );
}
