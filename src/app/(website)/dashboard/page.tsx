import { QueryProvider } from "@/components/Providers/QueryClientProvider";
import React from "react";
import DashBoard from "./_components/Dashboard";

const DashBoardPage = () => {
  return (
    <QueryProvider>
      <DashBoard />
    </QueryProvider>
  );
};

export default DashBoardPage;
