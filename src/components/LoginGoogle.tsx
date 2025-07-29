"use client";

import { signInWithGoogle } from "@/actions/auth";
import React, { useTransition } from "react";
import { FaGoogle } from "react-icons/fa";

const LoginGoogle = () => {
  const [isPending, startTransition] = useTransition();

  const handleGoogleLogin = () => {
    startTransition(async () => {
      await signInWithGoogle();
    });
  };

  return (
    <div
      onClick={handleGoogleLogin}
      role="button"
      tabIndex={0}
      className="w-full h-12 rounded-lg bg-foreground text-background flex items-center justify-center gap-3 px-4 font-medium shadow transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-ring"
    >
      <FaGoogle className="text-lg" />
      <span>{isPending ? "Redirecting..." : "Login with Google"}</span>
    </div>
  );
};

export default LoginGoogle;
