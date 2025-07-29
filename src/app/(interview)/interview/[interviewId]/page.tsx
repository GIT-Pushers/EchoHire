"use client";
import { useQuery } from "@tanstack/react-query";
import { GetInterviewDetails } from "@/service/service";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  RocketIcon,
  AlertTriangle,
  BotIcon,
  LightbulbIcon,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const InterviewPage = () => {
  const { interviewId } = useParams();

  const interviewIdStr = Array.isArray(interviewId)
    ? interviewId[0]
    : interviewId ?? "";

  const { data, isLoading, isError } = useQuery({
    queryFn: () => GetInterviewDetails(interviewIdStr),
    queryKey: ["interview", interviewIdStr],
    enabled: !!interviewIdStr,
  });

  // Minimal AI features description
  const aiFeatures = [
    "Real-time speech analysis",
    "Response evaluation",
    "Automated feedback",
  ];

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-full" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <div className="flex gap-2 pt-4">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-24 rounded-full" />
            </div>
            <Skeleton className="h-10 w-full mt-8 rounded-lg" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError || !data || data.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Invalid Interview Link</AlertTitle>
            <AlertDescription>
              Please check your invitation or contact support.
            </AlertDescription>
          </Alert>
          <Button
            variant="outline"
            className="w-full mt-4"
            onClick={() => (window.location.href = "/")}
          >
            Return Home
          </Button>
        </div>
      </div>
    );
  }

  const {
    companyName,
    companyDescription,
    jobName,
    jobDescription,
    interviewTypes,
  } = data[0];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <Card className="w-full max-w-2xl shadow-lg">
        <div className="bg-blue-600 h-1 w-full" />
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <CardTitle className="text-2xl">{companyName}</CardTitle>
              <p className="text-sm text-gray-600">{companyDescription}</p>
            </div>
            <Badge variant="secondary">{jobName}</Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <Separator />

          {/* Job Description */}
          <div>
            <h3 className="font-semibold mb-2">Position Details</h3>
            <p className="text-sm text-gray-700 whitespace-pre-line">
              {jobDescription}
            </p>
          </div>

          {/* Interview Format */}
          {interviewTypes?.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Interview Format</h3>
              <div className="flex flex-wrap gap-2">
                {interviewTypes.map((type: string, index: number) => (
                  <Badge key={index} variant="outline">
                    {type}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* AI Assistant */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <BotIcon className="h-4 w-4 text-blue-600" />
              <h3 className="font-semibold text-sm">AI-Powered Interview</h3>
            </div>
            <ul className="text-xs text-gray-700 space-y-1 pl-6 list-disc">
              {aiFeatures.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          {/* Quick Tips */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <LightbulbIcon className="h-4 w-4 text-gray-600" />
              <h3 className="font-semibold text-sm">Quick Tips</h3>
            </div>
            <ul className="text-xs text-gray-700 space-y-1 pl-6 list-disc">
              <li>Ensure good lighting and audio</li>
              <li>Have your resume handy</li>
              <li>Prepare questions for the interviewer</li>
            </ul>
          </div>

          {/* Join Button */}
          <Link href={`/start/${interviewId}`}>
            <Button
              className="w-full mt-4 py-6 bg-blue-600 hover:bg-blue-700"
              size="lg"
            >
              <RocketIcon className="mr-2 h-4 w-4" />
              Start Interview
            </Button>
          </Link>
          <p className="text-xs text-gray-500 text-center">
            Need help?{" "}
            <a
              href="mailto:support@example.com"
              className="text-blue-600 hover:underline"
            >
              Contact support
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default InterviewPage;
