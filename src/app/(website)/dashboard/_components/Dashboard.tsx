"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Copy,
  Trash2,
  Loader2,
  FileText,
  Briefcase,
  Building,
  CheckCircle,
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { FetchInterview, DeleteInterview } from "@/service/service";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

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
  const [selectedInterviewId, setSelectedInterviewId] = useState<string | null>(
    null
  );
  const queryClient = useQueryClient();

  // Fetch current user email
  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session?.user?.email) {
        setEmail(data.session.user.email);
      }
    };
    getSession();
  }, [supabase]);

  // Fetch interviews
  const {
    data: interviews,
    isLoading,
    isError,
  } = useQuery<Interview[]>({
    queryFn: () => FetchInterview(email as string),
    queryKey: ["Interviews", email],
    enabled: !!email,
  });

  // Mutation to delete interview
  const deleteMutation = useMutation({
    mutationFn: (id: string) => DeleteInterview(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Interviews", email] });
    },
  });

  const handleCopy = (link: string) => {
    navigator.clipboard.writeText(link);
    setCopied(link);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleDelete = () => {
    if (selectedInterviewId) {
      deleteMutation.mutate(selectedInterviewId);
      setSelectedInterviewId(null);
    }
  };

  return (
    <div className="min-h-screen w-full bg-muted/40 px-4 py-8 sm:px-6 sm:py-12">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 sm:mb-10">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
              Your Interviews
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {interviews?.length || 0} interview
              {interviews?.length !== 1 ? "s" : ""} found
            </p>
          </div>
          <Link href="/create-interview" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto text-base px-6 py-3">
              + New Meeting
            </Button>
          </Link>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="h-full">
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2 mt-2" />
                </CardHeader>
                <CardContent className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-4/6" />
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Skeleton className="h-10 w-1/2" />
                  <Skeleton className="h-10 w-1/2" />
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="bg-destructive/10 p-4 rounded-lg border border-destructive/30 text-center">
            <p className="text-destructive">
              Error loading interviews. Please try again.
            </p>
            <Button
              variant="ghost"
              className="mt-2"
              onClick={() =>
                queryClient.refetchQueries({ queryKey: ["Interviews", email] })
              }
            >
              Retry
            </Button>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !isError && interviews && interviews.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <FileText className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium text-foreground mb-2">
              No interviews yet
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Create your first interview to get started with mock interviews
              and feedback.
            </p>
            <Link href="/create-interview">
              <Button>Create Interview</Button>
            </Link>
          </div>
        )}

        {/* Success State */}
        {interviews && interviews.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {interviews.map((interview) => {
              const interviewLink = `${process.env.NEXT_PUBLIC_BASE_URL}/interview/${interview.interview_id}`;

              return (
                <Card
                  key={interview.interview_id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <Briefcase className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg font-semibold line-clamp-1">
                          {interview.jobName}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                          <Building className="w-3 h-3" />
                          <span className="line-clamp-1">
                            {interview.companyName}
                          </span>
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium bg-secondary px-2 py-1 rounded">
                        {interview.interviewTypes}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm line-clamp-3">
                        <span className="font-medium">Company:</span>{" "}
                        {interview.companyDescription}
                      </p>
                      <p className="text-sm line-clamp-3">
                        <span className="font-medium">Job:</span>{" "}
                        {interview.jobDescription}
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    {/* Share Link Modal */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="flex-1">
                          <Copy className="w-4 h-4 mr-2" />
                          Share
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
                            disabled={copied === interviewLink}
                          >
                            {copied === interviewLink ? (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                        {copied === interviewLink && (
                          <p className="text-green-600 text-sm mt-2">
                            Link copied to clipboard!
                          </p>
                        )}
                      </DialogContent>
                    </Dialog>

                    {/* Delete Confirmation Modal */}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="destructive"
                          onClick={() =>
                            setSelectedInterviewId(interview.interview_id)
                          }
                          disabled={deleteMutation.isPending}
                          className="flex-1"
                        >
                          {deleteMutation.isPending &&
                          selectedInterviewId === interview.interview_id ? (
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4 mr-2" />
                          )}
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you sure you want to delete this interview?
                          </AlertDialogTitle>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel
                            disabled={deleteMutation.isPending}
                          >
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={handleDelete}
                            disabled={deleteMutation.isPending}
                          >
                            {deleteMutation.isPending ? (
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            ) : null}
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashBoard;
