import { z } from "zod";

export const interviewTypes = [
  "Behavioral",
  "HR",
  "System Design",
  "Case Study",
  "Technical Discussion",
  "Leadership",
  "Product Thinking",
  "Team Collaboration",
] as const;

export const formSchema = z.object({
  companyName: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
  companyDescription: z.string().min(10, {
    message: "Company description must be at least 10 characters.",
  }),
  jobName: z.string().min(2, {
    message: "Job name must be at least 2 characters.",
  }),
  jobDescription: z.string().min(10, {
    message: "Job description must be at least 10 characters.",
  }),
  interviewTypes: z.array(z.string()).nonempty({
    message: "You must select at least one interview type.",
  }),
  numberOfQuestions: z.string().nonempty({
    message: "Please select the number of questions.",
  }),
});

export type FormData = z.infer<typeof formSchema>;
