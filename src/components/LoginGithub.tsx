"use client";

import { signInWithGithub } from "@/actions/auth";
import React, { useTransition } from "react";
import { FaGithub } from "react-icons/fa";

const LoginGithub = () => {
  const [isPending, startTransition] = useTransition();

  const handleGithubLogin = () => {
    startTransition(async () => {
      await signInWithGithub();
    });
  };

  return (
    <div
      onClick={handleGithubLogin}
      role="button"
      tabIndex={0}
      className="w-full h-12 rounded-lg bg-foreground text-background flex items-center justify-center gap-3 px-4 font-medium shadow transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-ring"
    >
      <FaGithub className="text-lg" />
      <span>{isPending ? "Redirecting..." : "Login with GitHub"}</span>
    </div>
  );
};

export default LoginGithub;
