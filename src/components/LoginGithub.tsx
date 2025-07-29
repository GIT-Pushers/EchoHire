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
      className="w-full gap-4 hover:cursor-pointer mt-6 h-12 bg-gray-800 rounded-md p-4 flex justify-center items-center"
    >
      <FaGithub className="text-white" />
      <p className="text-white">
        {isPending ? "Redirecting..." : "Login with Github"}
      </p>
    </div>
  );
};

export default LoginGithub;
