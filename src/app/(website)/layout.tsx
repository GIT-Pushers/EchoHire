import NavBar from "@/components/AppNavbar";
import { SidebarLeft } from "@/components/sidebar-left";

import { SidebarProvider } from "@/components/ui/sidebar";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <SidebarProvider>
        <SidebarLeft />
        <main className="w-full">
          <NavBar />
          <div className="px-4"> {children}</div>
        </main>
      </SidebarProvider>
    </>
  );
};

export default layout;
