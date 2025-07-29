"use client";

import * as React from "react";
import {
  AudioWaveform,
  Command,
  HelpCircle,
  History,
  Home,
  Mic,
  Settings,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "./nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// Sample data
const data = {
  teams: [
    {
      name: "Acme Inc",
      logo: Command,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
      isActive: true,
    },
    {
      title: "Start Interview",
      url: "/interview",
      icon: Mic,
      isActive: false,
    },
    {
      title: "Session History",
      url: "/sessions",
      icon: History,
      isActive: false,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
      isActive: false,
    },
    {
      title: "Help / Tips",
      url: "/help",
      icon: HelpCircle,
      isActive: false,
    },
  ],
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
};

export function SidebarLeft(props: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="border-r bg-white" {...props}>
      <SidebarHeader className="p-4 border-b">
        {/* Logo & App Name */}
        <div className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <Command className="w-5 h-5" />
          AI Interview
        </div>
      </SidebarHeader>

      <SidebarContent className="flex-1">
        <NavMain items={data.navMain} />
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <NavUser user={data.user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
