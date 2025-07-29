import * as React from "react";
import { Plus } from "lucide-react";

import { Calendars } from "@/components/calendars";
import { DatePicker } from "@/components/date-picker";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";


const data = {
  calendars: [
    {
      name: "My Todo",
      items: ["Personal", "Work", "Family"],
    },
  ],
};

export function SidebarRight({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="none"
      className="sticky top-0 hidden h-svh border-l lg:flex"
      {...props}
    >
      <SidebarContent className="mt-15  ">
        <DatePicker />
        <SidebarSeparator className="mx-0" />
        <Calendars calendars={data.calendars} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
