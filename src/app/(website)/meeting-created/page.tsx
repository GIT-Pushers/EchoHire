"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

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
        console.log("✅ Loaded interview data:", parsed.state.interview);
      }

      if (questionsRaw) {
        const parsedQ = JSON.parse(questionsRaw);
        console.log(
          "✅ Loaded questions:",
          parsedQ.state.questions?.interviewQuestions
        );
      }

      // Clean up
      localStorage.removeItem("interview-storage");
      localStorage.removeItem("interview-questions");
    } catch (err) {
      console.error("❌ Failed to load or parse localStorage:", err);
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background text-foreground px-4">
      <div className="max-w-2xl w-full space-y-6 bg-muted p-8 rounded-xl shadow-lg border border-border">
        <h1 className="text-2xl font-semibold text-center">
          🎉 Meeting Created Successfully!
        </h1>

        {interviewData && (
          <div className="space-y-4 text-sm text-foreground bg-background px-4 py-4 rounded-md border border-border">
            <p>
              <strong>Company:</strong> {interviewData.companyName}
            </p>
            <p>
              <strong>Job Title:</strong> {interviewData.jobName}
            </p>
            <p>
              <strong>Description:</strong> {interviewData.jobDescription}
            </p>
            <p>
              <strong>Email:</strong> {interviewData.email}
            </p>
            <p>
              <strong>Interview Types:</strong>{" "}
              {interviewData.interviewTypes.join(", ")}
            </p>
            <p>
              <strong>Total Questions:</strong>{" "}
              {interviewData.numberOfQuestions}
            </p>

            <hr />

            <div className="space-y-2">
              <p className="font-semibold">Questions:</p>
              {interviewData.questions?.interviewQuestions &&
                Object.entries(
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
                    <p className="underline text-primary font-medium">{type}</p>
                    <ul className="list-disc pl-5 text-sm space-y-1">
                      {questions.map((q, i) => (
                        <li key={i}>{q}</li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>
          </div>
        )}

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
