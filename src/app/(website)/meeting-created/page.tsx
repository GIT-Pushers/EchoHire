"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface Question {
  question: string;
  type: string;
}

interface InterviewData {
  companyName: string;
  companyDescription: string;
  jobName: string;
  jobDescription: string;
  interviewTypes: string[];
  numberOfQuestions: string;
  email: string;
  questions: {
    interviewQuestions: Question[];
  };
}

const MeetingCreatedPage = () => {
  const searchParams = useSearchParams();
  const interviewId = searchParams.get("id");
  const interviewLink = `${process.env.NEXT_PUBLIC_BASE_URL}/interview/${interviewId}`;

  const [interviewData, setInterviewData] = useState<InterviewData | null>(
    null
  );

  useEffect(() => {
    try {
      const storageRaw = localStorage.getItem("interview-storage");
      const questionsRaw = localStorage.getItem("interview-questions");

      if (storageRaw) {
        const parsed = JSON.parse(storageRaw);
        setInterviewData(parsed.state.interview || null);
      }

      if (questionsRaw) {
        const parsedQ = JSON.parse(questionsRaw);
        console.log(
          "✅ Loaded questions:",
          parsedQ.state.questions?.interviewQuestions
        );
      }
    } catch (err) {
      console.error("❌ Failed to load or parse localStorage:", err);
    }
  }, []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background px-4 py-10">
      <Card className="w-full max-w-5xl border shadow-lg">
        <CardHeader>
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="text-3xl">🎉</div>
            <CardTitle className="text-2xl font-bold">
              Meeting Created Successfully!
            </CardTitle>
            <CardDescription>
              Share the link below or begin the interview now.
            </CardDescription>
          </div>
        </CardHeader>

        <Separator />

        {interviewData ? (
          <CardContent className="p-6 space-y-6">
            {/* Overview Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div className="space-y-2">
                <p>
                  <span className="font-semibold">Company:</span>{" "}
                  {interviewData.companyName}
                </p>
                <p>
                  <span className="font-semibold">Job Title:</span>{" "}
                  {interviewData.jobName}
                </p>
                <p>
                  <span className="font-semibold">Email:</span>{" "}
                  {interviewData.email}
                </p>
                <p>
                  <span className="font-semibold">Questions:</span>{" "}
                  {interviewData.numberOfQuestions}
                </p>
              </div>
              <div className="space-y-2">
                <p>
                  <span className="font-semibold">Company Description:</span>
                </p>
                <p className="text-muted-foreground">
                  {interviewData.companyDescription}
                </p>
                <p>
                  <span className="font-semibold">Job Description:</span>
                </p>
                <p className="text-muted-foreground">
                  {interviewData.jobDescription}
                </p>
              </div>
            </div>

            {/* Interview Types */}
            <div>
              <p className="font-semibold mb-2">Interview Types:</p>
              <div className="flex flex-wrap gap-2">
                {interviewData.interviewTypes.map((type, i) => (
                  <Badge key={i} variant="secondary">
                    {type}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            {/* Questions Section */}
            <div>
              <p className="font-semibold mb-3">Interview Questions:</p>
              <ScrollArea className="h-64 pr-2">
                <div className="space-y-4">
                  {Object.entries(
                    interviewData.questions.interviewQuestions.reduce(
                      (acc: Record<string, string[]>, q) => {
                        acc[q.type] = acc[q.type] || [];
                        acc[q.type].push(q.question);
                        return acc;
                      },
                      {}
                    )
                  ).map(([type, questions]) => (
                    <div key={type}>
                      <p className="font-medium underline text-primary">
                        {type}
                      </p>
                      <ul className="list-disc pl-5 space-y-1 text-muted-foreground text-sm">
                        {questions.map((q, i) => (
                          <li key={i}>{q}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>

            <Separator />

            {/* Interview Link */}
            <div className="text-sm">
              <p className="font-semibold mb-1">Interview Link:</p>
              <code className="block break-all bg-muted p-2 rounded-md border text-muted-foreground">
                {interviewLink}
              </code>
            </div>
          </CardContent>
        ) : (
          <CardContent>
            <p className="text-center text-muted-foreground">
              Loading interview data...
            </p>
          </CardContent>
        )}

        <CardFooter>
          <Button asChild className="w-full">
            <Link href={interviewLink}>Join Interview</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MeetingCreatedPage;
