import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";

import {
  Home,
  PlusCircle,
  Settings,
  HelpCircle,
  Phone,
  AudioLines,
} from "lucide-react";
import Link from "next/link";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Create Interview",
    url: "/create-interview",
    icon: PlusCircle,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
  {
    title: "Contact",
    url: "/contact",
    icon: Phone,
  },
  {
    title: "Help",
    url: "/help",
    icon: HelpCircle,
  },
];

export default function SidebarLeft() {
  return (
    <Sidebar>
      {/* Big Header */}
      <SidebarHeader className="px-4 py-6 border-b border-gray-200">
        <Link
          href="/"
          className="flex items-center gap-3 text-xl font-semibold text-gray-800"
        >
          <AudioLines className="w-6 h-6 text-primary" />
          <span className="tracking-wide">EchoHire</span>
        </Link>
      </SidebarHeader>

      {/* Menu */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a
                      href={item.url}
                      className="flex items-center gap-2 text-sm font-medium"
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
