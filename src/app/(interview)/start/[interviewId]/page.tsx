"use client";
import Vapi from "@vapi-ai/web";
import { FetchInterviewDetals } from "@/service/service";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, PhoneOff } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

const InterviewPage = () => {
  const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI as string);
  const { interviewId } = useParams();
  const interviewIdStr =
    typeof interviewId === "string" ? interviewId : undefined;
  const [isSelfMuted, setIsSelfMuted] = useState(false);
  const [userProfile, setUserProfile] = useState<{
    username: string;
    avatarUrl: string | null;
    email: string;
  } | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("username, avatar_url")
          .eq("id", user.id)
          .single();

        setUserProfile({
          username: profile?.username || user.email?.split("@")[0] || "User",
          avatarUrl: user?.user_metadata?.avatar_url || null,
          email: user.email || "",
        });
      }
    };

    fetchUserProfile();
  }, [supabase]);

  const { data, isLoading } = useQuery({
    queryFn: () => FetchInterviewDetals(interviewIdStr as string),
    queryKey: ["Interview-current", interviewIdStr],
    enabled: !!interviewIdStr,
  });
  useEffect(() => {
    if (!isLoading && data && userProfile) {
      startcall();
    }
  }, [isLoading, data, userProfile]);

  console.log(userProfile);
  console.log("data---------", data);

  const startcall = () => {
    let questionList = "";
    data?.questions.forEach((q: any) => {
      questionList = q.question + "," + questionList;
    });

    console.log(questionList);

    vapi.start({
      name: "AI Recruiter",
      firstMessage: `Hi ${userProfile?.username}, how are you? Ready for your interview on ${data?.jobName}?`,
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
You are an AI voice assistant conducting interviews.
Your job is to ask candidates provided interview questions, assess their responses.
Begin the conversation with a friendly introduction, setting a relaxed yet professional tone. Example:
"Hey there! Welcome to your ${data.jobName} interview. Let’s get started with a few questions!"
Ask one question at a time and wait for the candidate’s response before proceeding. Keep the questions clear and concise. Below Are the questions ask one by one:
Questions: ${questionList}
If the candidate struggles, offer hints or rephrase the question without giving away the answer. Example:
"Need a hint? Think about how React tracks component updates!"
Provide brief, encouraging feedback after each answer. Example:
"Nice! That’s a solid answer."
"Hmm, not quite! Want to try again?"
Keep the conversation natural and engaging—use casual phrases like "Alright, next up…" or "Let’s tackle a tricky one!"
After 5-7 questions, wrap up the interview smoothly by summarizing their performance. Example:
"That was great! You handled some tough questions well. Keep sharpening your skills!"
End on a positive note:
"Thanks for chatting! Hope to see you crushing projects soon!"
Key Guidelines:
✓ Be friendly, engaging, and witty
✓ Keep responses short and natural, like a real conversation
✓ Adapt based on the candidate’s confidence level
✓ Ensure the interview remains focused on React`.trim(),
          },
        ],
      },
    });
  };

 

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
        <div className="flex flex-col items-center justify-center bg-muted rounded-lg p-6 border border-border">
          <Avatar className="w-32 h-32 md:w-40 md:h-40 mb-4 border-2 border-primary">
            <AvatarImage src="/ai-avatar.png" alt="AI Interviewer" />
            <AvatarFallback className="bg-primary text-white">
              AI
            </AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-semibold mb-1 text-foreground">
            AI Interviewer
          </h2>
          <p className="text-muted-foreground text-sm">Active</p>
        </div>

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
          <h2 className="text-xl font-semibold mb-1 text-foreground">
            {userProfile.username}
          </h2>
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
        >
          <PhoneOff className="h-6 w-6" onClick={() => vapi.stop()} />
        </Button>
      </div>

      <div className="bg-background p-2 text-center text-xs text-muted-foreground border-t border-border">
        Interview ID: {interviewIdStr} | Logged in as: {userProfile.email}
      </div>
    </div>
  );
};

export default InterviewPage;
