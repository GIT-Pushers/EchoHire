import { QueryProvider } from "@/components/Providers/QueryClientProvider";
import React, { ReactNode } from "react";

const Interviewlayout = ({ children }: { children: ReactNode }) => {
  return <QueryProvider>{children}</QueryProvider>;
};

export default Interviewlayout;
