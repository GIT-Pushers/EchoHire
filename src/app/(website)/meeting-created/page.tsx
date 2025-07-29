"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";
import { Button } from "@/components/ui/button";

const MeetingCreatedPage = () => {
  const searchParams = useSearchParams();
  const interviewId = searchParams.get("id");

  const interviewLink = `${process.env.NEXT_PUBLIC_BASE_URL}/interview/${interviewId}`;

  return (
    <div className="flex items-center justify-center min-h-screen bg-background text-foreground px-4">
      <div className="max-w-md w-full text-center space-y-6 bg-muted p-8 rounded-xl shadow-lg border border-border">
        <h1 className="text-2xl font-semibold">
          🎉 Meeting Created Successfully!
        </h1>

        <p className="text-muted-foreground text-sm">
          Your AI-powered interview session has been created.
        </p>

        <div className="break-all text-sm text-foreground bg-background px-4 py-2 rounded-md border border-border">
          <code>{interviewLink}</code>
        </div>

        <Button asChild className="w-full">
          <Link href={interviewLink}>Join Interview</Link>
        </Button>
      </div>
    </div>
  );
};

export default MeetingCreatedPage;
