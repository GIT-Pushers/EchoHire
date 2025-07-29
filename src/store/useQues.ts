import { create } from "zustand";
import { persist } from "zustand/middleware";

interface InterviewQuestion {
  question: string;
  type: string;
}

interface QuestionStore {
  questions: InterviewQuestion[];
  setQuestions: (newQuestions: InterviewQuestion[]) => void;
  clearQuestions: () => void;
}

export const useQuestionStore = create<QuestionStore>()(
  persist(
    (set) => ({
      questions: [],
      setQuestions: (newQuestions) => set({ questions: newQuestions }),
      clearQuestions: () => set({ questions: [] }),
    }),
    {
      name: "interview-questions",
    }
  )
);
