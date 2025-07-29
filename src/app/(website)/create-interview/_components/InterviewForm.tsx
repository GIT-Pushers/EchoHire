"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
} from "@/components/ui/form";

import { generateInterviewPrompt } from "@/utils/helperFunction/GeneratePrompt";
import { generateQuestions, SaveInterviewDetails } from "@/service/service";
import { formSchema, interviewTypes } from "@/utils/Schemas/JobSchema";
import { useMutation } from "@tanstack/react-query";
import { useQuestionStore } from "@/store/useQues";
import { useInterviewStore } from "@/store/useInterview";
import { createClient } from "@/utils/supabase/client";

type InterviewFormValues = z.infer<typeof formSchema>;

export default function InterviewForm() {
  const router = useRouter();
  const supabase = createClient();
  const [userEmail, setUserEmail] = React.useState<string>(
    "unknown@example.com"
  );

  React.useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUserEmail(data.session?.user?.email || "unknown@example.com");
    };
    fetchSession();
  }, [supabase]);

  const { setQuestions } = useQuestionStore();
  const { interview, setInterview } = useInterviewStore();

  const form = useForm<InterviewFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: interview.companyName,
      companyDescription: interview.companyDescription,
      jobName: interview.jobName,
      jobDescription: interview.jobDescription,
      interviewTypes: interview.interviewTypes,
      numberOfQuestions: interview.numberOfQuestions,
    },
  });

  const { reset } = form;

  const mutation = useMutation({
    mutationFn: async (formData: InterviewFormValues) => {
      const prompt = generateInterviewPrompt(formData);
      const { result } = await generateQuestions(prompt);
      console.log("generated");
      const cleaned = result.replace(/```json|```/g, "").trim();
      const questions = JSON.parse(cleaned);

      const interviewDetails = {
        ...formData,
        email: userEmail,
        questions,
      };

      console.log("✅ Final Interview Object:", interviewDetails);
      const interview_id = await SaveInterviewDetails(interviewDetails);
      // Save to store or DB here if needed
      setInterview(interviewDetails);
      setQuestions(questions);

      reset();
      return interview_id;
    },
    onSuccess: (interview_id) => {
      toast.success("Interview created successfully!");

      router.push(`/meeting-created?id=${interview_id}`);
    },
    onError: (error) => {
      console.error("❌ Error generating questions:", error);
      toast.error("Failed to generate questions.", {
        description: error?.message || "Something went wrong.",
      });
    },
  });

  const onSubmit = (formData: InterviewFormValues) => {
    mutation.mutate(formData);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 lg:p-8">
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="sr-only">Back</span>
        </Button>
        <h1 className="text-2xl md:text-3xl font-bold">Interview Details</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Company Name */}
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={mutation.isPending}
                    placeholder="Enter company name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Company Description */}
          <FormField
            control={form.control}
            name="companyDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Brief description about the company"
                    className="min-h-[100px]"
                    {...field}
                    disabled={mutation.isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Job Name */}
          <FormField
            control={form.control}
            name="jobName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Title</FormLabel>
                <FormControl>
                  <Input
                    disabled={mutation.isPending}
                    placeholder="Enter job title"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Job Description */}
          <FormField
            control={form.control}
            name="jobDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe the job responsibilities and requirements"
                    className="min-h-[100px]"
                    {...field}
                    disabled={mutation.isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Interview Types */}
          <FormField
            control={form.control}
            name="interviewTypes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Interview Types</FormLabel>
                <FormDescription>
                  Select all interview types involved.
                </FormDescription>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2">
                  {interviewTypes.map((type) => (
                    <FormItem key={type} className="flex items-start space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(type)}
                          onCheckedChange={(checked) => {
                            const updated = checked
                              ? [...field.value, type]
                              : field.value.filter((v) => v !== type);
                            field.onChange(updated);
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">{type}</FormLabel>
                    </FormItem>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Number of Questions */}
          <FormField
            control={form.control}
            name="numberOfQuestions"
            render={({ field }) => (
              <FormItem className="w-full md:w-1/2 lg:w-1/3">
                <FormLabel>Number of Questions</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value?.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select number of questions" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="5">5 questions</SelectItem>
                    <SelectItem value="10">10 questions</SelectItem>
                    <SelectItem value="15">15 questions</SelectItem>
                    <SelectItem value="20">20 questions</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={mutation.isPending}
              className="w-full sm:w-auto"
            >
              {mutation.isPending ? "Generating..." : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
