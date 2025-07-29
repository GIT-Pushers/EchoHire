import { create } from "zustand";

interface InterviewResult {
  communication: number;
  confidence: number;
  technicalKnowledge: number;
  collaboration: number;
  hirePercentage: number;
  suggestion: string;
}

interface InterviewResultStore {
  result: InterviewResult;
  setResult: (newResult: InterviewResult) => void;
  clearResult: () => void;
}

export const useInterviewResultStore = create<InterviewResultStore>((set) => ({
  result: {
    communication: 0,
    confidence: 0,
    technicalKnowledge: 0,
    collaboration: 0,
    hirePercentage: 0,
    suggestion: "",
  },
  setResult: (newResult) => set({ result: newResult }),
  clearResult: () =>
    set({
      result: {
        communication: 0,
        confidence: 0,
        technicalKnowledge: 0,
        collaboration: 0,
        hirePercentage: 0,
        suggestion: "",
      },
    }),
}));
