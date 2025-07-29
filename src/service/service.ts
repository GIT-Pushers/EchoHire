import { createClient } from "@/utils/supabase/client";
import axios from "axios";

import { v4 as uuidv4 } from "uuid";
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL!,
});

export async function generateQuestions(prompt: string) {
  try {
    const res = await api.post("/api/generateQuestions", { prompt });
    return res.data;
  } catch (err) {
    console.log(err);
    throw new Error("Error in Generating Questions");
  }
}

const supabase = createClient();
export async function GetInterviewDetails(interview_id: string) {
  try {
    const result = await supabase
      .from("Interview")
      .select(
        "created_at,companyName,companyDescription,jobName,jobDescription,interviewTypes"
      )
      .eq("interview_id", interview_id);
    return result.data;
    console.log(result);
  } catch (err) {
    console.log(err);
    throw new Error("Error Fetching interview Details");
  }
}
interface Questions {
  question: string;
  type: string;
}
export async function SaveInterviewDetails({
  companyName,
  companyDescription,
  jobName,
  jobDescription,
  interviewTypes,
  email,
  numberOfQuestions,
  questions,
}: {
  companyName: string;
  companyDescription: string;
  jobName: string;
  jobDescription: string;
  interviewTypes: string[];
  email: string;
  numberOfQuestions: string;
  questions: Questions[];
}) {
  const interview_id = uuidv4();
  const { data, error } = await supabase.from("Interview").insert({
    companyName,
    companyDescription,
    jobName,
    jobDescription,
    interviewTypes,
    email,
    numberOfQuestions,
    questions,
    interview_id,
  });

  if (error) {
    console.log(error);
  } else {
    console.log("success------", data);
    return interview_id;
  }
}

export async function FetchInterviewDetals(interview_id: string) {
  const { data, error } = await supabase
    .from("Interview")
    .select("*")
    .eq("interview_id", interview_id)
    .single();
  if (error) {
    throw new Error("Error Fetching Interview Details");
  }
  return data;
}

export async function FetchInterview(email: string) {
  const { data, error } = await supabase
    .from("Interview")
    .select(
      "interview_id,jobName,jobDescription,companyName,companyDescription,interviewTypes,email"
    )
    .eq("email", email);
  if (error) {
    throw new Error("Error Fetching Interviews");
  } else return data;
}

export async function DeleteInterview(interview_id: string) {
  const { data, error } = await supabase
    .from("Interview")
    .delete()
    .eq("interview_id", interview_id);
  if (error) {
    throw new Error("Error Deleting Interview");
  } else return data;
}
