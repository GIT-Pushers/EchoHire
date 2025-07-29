"use client";

import { signInWithGoogle } from "@/actions/auth";
import React, { useTransition } from "react";
import { FaGoogle } from "react-icons/fa";

const LoginGoogle = () => {
  const [isPending, startTransition] = useTransition();

  const handleGithubLogin = () => {
    startTransition(async () => {
      await signInWithGoogle();
    });
  };
  return (
    <div
      onClick={handleGithubLogin}
      className="w-full gap-4 hover:cursor-pointer mt-6 h-12 bg-gray-800 rounded-md p-4 flex justify-center items-center"
    >
      <FaGoogle className="text-white" />
      <p className="text-white">
        {isPending ? "Redirecting..." : "Login with Google"}
      </p>
    </div>
  );
};

export default LoginGoogle;
