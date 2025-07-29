import { create } from "zustand";
import { persist } from "zustand/middleware";
import { FormData } from "@/utils/Schemas/JobSchema";

interface InterviewStore {
  interview: FormData;
  setInterview: (updatedInterview: Partial<FormData>) => void;
}

export const useInterviewStore = create<InterviewStore>()(
  persist(
    (set) => ({
      interview: {
        companyName: "google",
        companyDescription: "software company",
        jobName: "software developer",
        jobDescription: "web development html css js",
        interviewTypes: ["Technical Discussion"],
        numberOfQuestions: "5",
      },
      setInterview: (updatedInterview) =>
        set((state) => ({
          interview: {
            ...state.interview,
            ...updatedInterview,
          },
        })),
    }),
    {
      name: "interview-storage",
    }
  )
);
