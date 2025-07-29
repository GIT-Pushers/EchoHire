"use client";

import { signOut } from "@/actions/auth";
import React, { useState } from "react";
import { LogOut } from "lucide-react";

const Logout = () => {
  const [loading, setLoading] = useState(false);

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await signOut();
    setLoading(false);
  };

  return (
    <form onSubmit={handleLogout}>
      <button
        type="submit"
        disabled={loading}
        className="flex items-center gap-2 rounded-lg px-4 py-2 bg-destructive text-white text-sm font-medium shadow hover:bg-destructive/90 transition disabled:opacity-60"
      >
        <LogOut className="h-4 w-4" />
        {loading ? "Signing out..." : "Sign out"}
      </button>
    </form>
  );
};

export default Logout;
