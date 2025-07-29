"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Maximize2 } from "lucide-react";

type Question = {
  question: string;
  type: string;
};

const initialQuestions: Question[] = [
  {
    question:
      "Tell me about a time when you found a critical bug in a software product. How did you approach debugging it, and what was the impact of your discovery?",
    type: "Experience",
  },
  {
    question:
      "Walk me through how you would design and implement a test suite for a web application login feature. What test cases would you prioritize and why?",
    type: "Technical Discussion",
  },
  {
    question:
      "Describe a situation where you had to work with a development team to resolve a production issue. How did you communicate the problem and collaborate on the solution?",
    type: "Behavioral",
  },
  {
    question:
      "You're tasked with testing a REST API that handles user payments. What testing strategies would you employ to ensure reliability, security, and performance? Walk me through your approach.",
    type: "Technical Discussion",
  },
  {
    question:
      "Give me an example of when you had to learn a new testing tool or technology quickly. How did you approach the learning process and apply it to your work?",
    type: "Behavioral",
  },
];

const QuestionsPage = () => {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEdit = (index: number, newValue: string) => {
    const updated = [...questions];
    updated[index].question = newValue;
    setQuestions(updated);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    console.log("Final Questions:", questions);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Questions submitted successfully!");
    }, 1000);
  };




  
  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 lg:p-8 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold">
          Review & Edit Questions
        </h1>
        <p className="text-muted-foreground">
          Review the generated questions and make any necessary edits before
          finalizing.
        </p>
      </div>

      <div className="space-y-4">
        {questions.map((q, index) => (
          <Card
            key={index}
            className="w-full hover:shadow-md transition-shadow"
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <Label className="text-lg font-medium">
                  Question {index + 1}
                </Label>
                <Badge variant="outline" className="capitalize">
                  {q.type}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Textarea
                value={q.question}
                onChange={(e) => handleEdit(index, e.target.value)}
                className="min-h-[100px] w-full resize-y"
                placeholder="Enter your question here..."
              />
            </CardContent>
            <CardFooter className="pt-0">
              <div className="flex justify-end w-full">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const textarea =
                      document.querySelectorAll("textarea")[index];
                    textarea.focus();
                  }}
                >
                  <Maximize2 className="h-4 w-4 mr-2" />
                  Expand
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="flex justify-end gap-4 pt-4">
        <Button variant="outline" className="w-full sm:w-auto">
          Regenerate
        </Button>
        <Button
          onClick={handleSubmit}
          className="w-full sm:w-auto"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Finalize Questions"}
        </Button>
      </div>
    </div>
  );
};

export default QuestionsPage;
