import { QueryProvider } from "@/components/Providers/QueryClientProvider";
import React from "react";
import InterviewForm from "./_components/InterviewForm";

const CreateInterview = () => {
  return (
    <>
      <QueryProvider>
        <InterviewForm />
      </QueryProvider>
    </>
  );
};

export default CreateInterview;
