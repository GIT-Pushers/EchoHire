// src/components/AppNavbar.tsx
"use client";

import { Settings } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "@/components/ModeToggle";
import { SidebarTrigger } from "./ui/sidebar";
import { createClient } from "@/utils/supabase/client";
import React, { useEffect, useState } from "react";

// Import the modified Logout component
import Logout from "./Signout"; 

const NavBar = () => {
  const supabase = createClient();
  const [userAvatar, setUserAvatar] = useState<string | null>(null);
  const [userInitials, setUserInitials] = useState<string>("CN");

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        setUserAvatar(user.user_metadata?.avatar_url || null);
        const email = user.email;
        const username = user.user_metadata?.username;

        if (username) {
          setUserInitials(username.charAt(0).toUpperCase() + (username.charAt(1) || '').toUpperCase());
        } else if (email) {
          const emailPrefix = email.split('@')[0];
          setUserInitials(emailPrefix.charAt(0).toUpperCase() + (emailPrefix.charAt(1) || '').toUpperCase());
        } else {
          setUserInitials("U");
        }
      } else {
        setUserAvatar(null);
        setUserInitials("CN");
      }
    };

    fetchUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUserAvatar(session.user.user_metadata?.avatar_url || null);
        const email = session.user.email;
        const username = session.user.user_metadata?.username;

        if (username) {
          setUserInitials(username.charAt(0).toUpperCase() + (username.charAt(1) || '').toUpperCase());
        } else if (email) {
          const emailPrefix = email.split('@')[0];
          setUserInitials(emailPrefix.charAt(0).toUpperCase() + (emailPrefix.charAt(1) || '').toUpperCase());
        }
      } else {
        setUserAvatar(null);
        setUserInitials("CN");
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [supabase]);

  return (
    <nav className="flex items-center justify-between p-4 bg-background border-b border-border">
      <SidebarTrigger />
      <div className="flex items-center gap-4 ">
        <Link href="/dashboard" className="text-foreground hover:text-primary transition-colors">Dashboard</Link>
        <ModeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar>
              <AvatarImage src={userAvatar || "https://github.com/shadcn.png"} alt="User Avatar" />
              <AvatarFallback>{userInitials}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent sideOffset={10} className="w-56">
            <DropdownMenuLabel className="font-semibold px-2 py-1.5">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="flex items-center gap-2 px-2 py-1.5 text-sm">
              <Link href="/settings">
                <Settings className="h-4 w-4 mr-1 text-muted-foreground" />
                Settings
              </Link>
            </DropdownMenuItem>
            {/* Using the modified Logout component */}
            <DropdownMenuItem asChild variant="destructive" className="flex items-center gap-2 px-2 py-1.5 text-sm">
              <Logout> {/* Pass the icon and text as children to Logout */}
                Sign out
              </Logout>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default NavBar;