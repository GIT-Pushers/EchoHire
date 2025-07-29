// src/components/Signout.tsx
"use client";

import { signOut } from "@/actions/auth";
import React, { useState } from "react";
import { LogOut } from "lucide-react";

// Define props for the Logout component
interface LogoutProps {
  children?: React.ReactNode; // Allows passing button text/icon as children
  className?: string; // Allows passing Tailwind classes
  // You might want to pass other button props like 'disabled' if needed
}

const Logout: React.FC<LogoutProps> = ({ children, className }) => {
  const [loading, setLoading] = useState(false);

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    await signOut();
    setLoading(false);
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className={`flex items-center gap-2 rounded-lg px-4 py-2 bg-red-100 text-red-700 text-sm font-medium shadow-sm hover:bg-red-200 transition disabled:opacity-60 ${className || ''}`}
      type="button"
    >
      {children ? children : (
        <>
          <LogOut className="h-4 w-4 mr-1" />
          {loading ? "Signing out..." : "Sign out"}
        </>
      )}
    </button>
  );
};

export default Logout;