"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { FetchInterview } from "@/service/service";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Copy } from "lucide-react";

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
  const [copied, setCopied] = useState<string | null>(null);

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

  const handleCopy = (link: string) => {
    navigator.clipboard.writeText(link);
    setCopied(link);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen w-full bg-muted px-6 py-12">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold text-foreground">
            Your Interviews
          </h1>
          <Link href="/create-interview">
            <Button className="text-base px-6 py-3">+ New Meeting</Button>
          </Link>
        </div>

        {isLoading && <p>Loading interviews...</p>}
        {isError && <p>Error loading interviews.</p>}
        {interviews && interviews.length === 0 && <p>No interviews found.</p>}

        {interviews && interviews.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {interviews.map((interview) => {
              const interviewLink = `${process.env.NEXT_PUBLIC_BASEURL}/interview/${interview.interview_id}`;
              return (
                <div
                  key={interview.interview_id}
                  className="bg-background p-6 rounded-xl shadow-lg border hover:shadow-xl transition"
                >
                  <h2 className="text-xl font-semibold text-foreground mb-1">
                    {interview.jobName}
                  </h2>
                  <p className="text-muted-foreground mb-1">
                    at {interview.companyName}
                  </p>
                  <p className="text-sm text-muted-foreground mb-1">
                    Type: {interview.interviewTypes}
                  </p>
                  <p className="text-sm text-muted-foreground mb-1">
                    Email: {interview.email}
                  </p>
                  <p className="text-sm mt-2">
                    <strong>Company Description:</strong>{" "}
                    {interview.companyDescription}
                  </p>
                  <p className="text-sm mt-1">
                    <strong>Job Description:</strong> {interview.jobDescription}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2 mb-4">
                    ID: {interview.interview_id}
                  </p>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full">
                        Share Link
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Interview Link</DialogTitle>
                      </DialogHeader>
                      <div className="flex items-center space-x-2">
                        <Input value={interviewLink} readOnly />
                        <Button
                          type="button"
                          size="icon"
                          onClick={() => handleCopy(interviewLink)}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                      {copied === interviewLink && (
                        <p className="text-green-600 text-sm mt-2">
                          Link copied!
                        </p>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashBoard;
