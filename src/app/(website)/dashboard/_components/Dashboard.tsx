"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { FetchInterview } from "@/service/service";

interface Interview {
  companyName: string;
  companyDescription: string;
  jobName: string;
  jobDescription: string;
  interviewTypes: string;
  email: string;
  interview_id: string;
}

const DashBoard = () => {
  const supabase = createClient();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session?.user?.email) {
        setEmail(data.session.user.email);
      }
    };
    getSession();
  }, [supabase]);

  const {
    data: interviews,
    isLoading,
    isError,
  } = useQuery<Interview[]>({
    queryFn: () => FetchInterview(email as string),
    queryKey: ["Interviews", email],
    enabled: !!email,
  });

  return (
    <div className="h-full bg-muted p-8">
      <div className="max-w-4xl mx-auto bg-background rounded-2xl shadow-md p-6">
        <h1 className="text-2xl font-semibold mb-6 text-foreground">
          Create a New Meeting
        </h1>

        <Link href="/create-interview">
          <Button className="text-base px-6 py-3 mb-8">+ New Meeting</Button>
        </Link>

        <div>
          {isLoading && <p>Loading interviews...</p>}
          {isError && <p>Error loading interviews.</p>}
          {interviews && interviews.length === 0 && <p>No interviews found.</p>}

          {interviews && interviews.length > 0 && (
            <ul className="space-y-4">
              {interviews.map((interview) => (
                <li
                  key={interview.interview_id}
                  className="bg-muted/50 p-4 rounded-lg shadow-sm border"
                >
                  <h2 className="text-xl font-semibold text-foreground">
                    {interview.jobName} @ {interview.companyName}
                  </h2>
                  <p className="text-sm text-muted-foreground mb-1">
                    Interview Type: {interview.interviewTypes}
                  </p>
                  <p className="text-sm text-muted-foreground mb-1">
                    Email: {interview.email}
                  </p>
                  <p className="text-sm mt-2 text-foreground">
                    <strong>Company Description:</strong>{" "}
                    {interview.companyDescription}
                  </p>
                  <p className="text-sm mt-1 text-foreground">
                    <strong>Job Description:</strong> {interview.jobDescription}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    ID: {interview.interview_id}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
