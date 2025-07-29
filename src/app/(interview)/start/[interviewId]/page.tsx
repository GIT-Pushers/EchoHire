"use client";
import Vapi from "@vapi-ai/web";
import { FetchInterviewDetals } from "@/service/service";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, PhoneOff } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

const InterviewPage = () => {
  const { interviewId } = useParams();
  const interviewIdStr =
    typeof interviewId === "string" ? interviewId : undefined;

  const supabase = createClient();
  const vapiRef = useRef<Vapi | null>(null);

  const [isSelfMuted, setIsSelfMuted] = useState(false);
  const [userProfile, setUserProfile] = useState<{
    username: string;
    avatarUrl: string | null;
    email: string;
  } | null>(null);

  useEffect(() => {
    vapiRef.current = new Vapi(process.env.NEXT_PUBLIC_VAPI as string);
    return () => {
      vapiRef.current?.stop();
    };
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getSession();
      const user = data?.session?.user;

      if (user) {
        setUserProfile({
          username:
            user.user_metadata?.name || user.email?.split("@")[0] || "User",
          avatarUrl: user.user_metadata?.avatar_url || null,
          email: user.email || "",
        });
      }
    };

    fetchUser();
  }, [supabase]);

  const { data, isLoading } = useQuery({
    queryFn: () => FetchInterviewDetals(interviewIdStr as string),
    queryKey: ["Interview-current", interviewIdStr],
    enabled: !!interviewIdStr,
  });

  const formatQuestions = () => {
    if (!data?.questions?.interviewQuestions) return "";

    const grouped = data.questions.interviewQuestions.reduce(
      (
        acc: Record<string, string[]>,
        q: { question: string; type: string }
      ) => {
        acc[q.type] = acc[q.type] || [];
        acc[q.type].push(q.question);
        return acc;
      },
      {}
    );

    return Object.entries(grouped)
      .map(
        ([type, questions]) =>
          `${type}:\n${questions.map((q, i) => `${i + 1}. ${q}`).join("\n")}`
      )
      .join("\n\n");
  };

  useEffect(() => {
    if (!isLoading && data && userProfile && vapiRef.current) {
      const formattedQuestions = formatQuestions();

      vapiRef.current.start({
        name: "AI Recruiter",
        firstMessage: `Hi ${userProfile.username}, how are you? Ready for your interview on ${data.jobName}?`,
        transcriber: {
          provider: "deepgram",
          model: "nova-2",
          language: "en-US",
        },
        voice: {
          provider: "playht",
          voiceId: "jennifer",
        },
        model: {
          provider: "openai",
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: `
You are an AI voice assistant conducting a mock interview.
Ask the following questions one by one, based on the categories provided:

${formattedQuestions}

Be friendly and clear. Provide hints if the user struggles.
Wrap up after 5–7 questions with encouraging feedback.
              `.trim(),
            },
          ],
        },
      });
    }
  }, [isLoading, data, userProfile]);

  if (isLoading || !userProfile) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-muted animate-pulse" />
          <p className="text-muted-foreground">Loading interview session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        {/* AI Interviewer */}
        <div className="flex flex-col items-center justify-center bg-muted rounded-lg p-6 border border-border">
          <Avatar className="w-32 h-32 md:w-40 md:h-40 mb-4 border-2 border-primary">
            <AvatarImage src="/ai-avatar.png" alt="AI Interviewer" />
            <AvatarFallback className="bg-primary text-white">
              AI
            </AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-semibold mb-1">AI Interviewer</h2>
          <p className="text-muted-foreground text-sm">Active</p>
        </div>

        {/* User */}
        <div className="flex flex-col items-center justify-center bg-muted rounded-lg p-6 border border-border">
          <Avatar className="w-32 h-32 md:w-40 md:h-40 mb-4 border-2 border-emerald-500">
            <AvatarImage
              src={userProfile.avatarUrl || "/default-avatar.jpg"}
              alt={userProfile.username}
            />
            <AvatarFallback className="bg-emerald-500 text-white">
              {userProfile.username.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-semibold mb-1">{userProfile.username}</h2>
          <p className="text-muted-foreground text-sm">
            {isSelfMuted ? "Muted" : "Active"}
          </p>
          {isSelfMuted && (
            <div className="mt-2 flex items-center text-destructive">
              <MicOff className="h-4 w-4 mr-1" />
              <span className="text-xs">Your microphone is off</span>
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="bg-muted p-4 flex justify-center space-x-6 border-t border-border">
        <Button
          variant={isSelfMuted ? "destructive" : "secondary"}
          size="lg"
          className="rounded-full w-14 h-14 p-0"
          onClick={() => setIsSelfMuted(!isSelfMuted)}
        >
          {isSelfMuted ? (
            <MicOff className="h-6 w-6 text-destructive" />
          ) : (
            <Mic className="h-6 w-6 text-primary" />
          )}
        </Button>

        <Button
          variant="destructive"
          size="lg"
          className="rounded-full w-14 h-14 p-0"
          onClick={() => vapiRef.current?.stop()}
        >
          <PhoneOff className="h-6 w-6" />
        </Button>
      </div>

      <div className="bg-background p-2 text-center text-xs text-muted-foreground border-t border-border">
        Interview ID: {interviewIdStr} | Logged in as: {userProfile.email}
      </div>
    </div>
  );
};

export default InterviewPage;
