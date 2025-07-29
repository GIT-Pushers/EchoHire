"use client";

import { useQuestionStore } from "@/store/useQues";
import React from "react";

const QuestionsPage = () => {
  const { questions, setQuestions } = useQuestionStore();

  const handleQuestionChange = (index: number, newQuestion: string) => {
    const updated = [...questions];
    updated[index].question = newQuestion;
    setQuestions(updated);
  };

  const handleTypeChange = (index: number, newType: string) => {
    const updated = [...questions];
    updated[index].type = newType;
    setQuestions(updated);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 space-y-6">
      <h1 className="text-2xl font-bold text-center">
        Edit Interview Questions
      </h1>
      {questions.length === 0 ? (
        <p className="text-center text-gray-500">No questions available.</p>
      ) : (
        questions.map((q, idx) => (
          <div key={idx} className="border p-4 rounded shadow space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Question {idx + 1}
              </label>
              <textarea
                className="mt-1 block w-full border border-gray-300 rounded p-2"
                value={q.question}
                onChange={(e) => handleQuestionChange(idx, e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Type
              </label>
              <input
                className="mt-1 block w-full border border-gray-300 rounded p-2"
                value={q.type}
                onChange={(e) => handleTypeChange(idx, e.target.value)}
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default QuestionsPage;
