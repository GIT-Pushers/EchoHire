"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useRouter } from "next/navigation";

const interviewResult = {
  communication: 8,
  confidence: 7,
  technicalKnowledge: 9,
  collaboration: 6,
  hirePercentage: 85,
  suggestion:
    "You demonstrated good knowledge and communication. To improve further, work on giving more structured answers and showing stronger confidence when discussing your projects. Keep practicing mock interviews and refine how you present yourself.",
};

const COLORS = ["#4F46E5", "#16A34A", "#DC2626", "#F59E0B"];

const metricData = [
  {
    name: "Communication",
    value: interviewResult.communication,
    color: COLORS[0],
  },
  { name: "Confidence", value: interviewResult.confidence, color: COLORS[1] },
  {
    name: "Technical Knowledge",
    value: interviewResult.technicalKnowledge,
    color: COLORS[2],
  },
  {
    name: "Collaboration",
    value: interviewResult.collaboration,
    color: COLORS[3],
  },
];

export default function InterviewEndPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-50 to-white px-4 py-10 flex flex-col items-center relative">
      {/* Back to Dashboard */}
      <button
        onClick={() => router.push("/dashboard")}
        className="absolute top-6 left-6 text-sm font-medium text-white bg-gray-800 hover:bg-gray-900 px-4 py-2 rounded-lg transition duration-200"
      >
        ← Back to Dashboard
      </button>

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold text-indigo-700 text-center mb-4">
        Interview Summary
      </h1>
      <p className="text-center text-gray-700 max-w-2xl mb-10 text-lg">
        Thank you for participating in the interview. Below is your performance
        summary and personalized feedback.
      </p>

      {/* Feedback Section */}
      <div className="w-full max-w-5xl bg-white p-8 rounded-2xl shadow-lg grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left - Text Feedback */}
        <div>
          <h2 className="text-xl font-semibold text-indigo-600 mb-4">
            Performance Overview
          </h2>
          <ul className="space-y-3 text-gray-800 text-base">
            <li>
              <strong>Communication:</strong> {interviewResult.communication}/10
            </li>
            <li>
              <strong>Confidence:</strong> {interviewResult.confidence}/10
            </li>
            <li>
              <strong>Technical Knowledge:</strong>{" "}
              {interviewResult.technicalKnowledge}/10
            </li>
            <li>
              <strong>Collaboration:</strong> {interviewResult.collaboration}/10
            </li>
            <li>
              <strong>Hire Recommendation:</strong>{" "}
              {interviewResult.hirePercentage}%
            </li>
          </ul>

          <div className="mt-6">
            <h3 className="text-md font-medium mb-2 text-gray-700">
              Feedback & Suggestions
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {interviewResult.suggestion}
            </p>
          </div>
        </div>

        {/* Right - Pie Chart Feedback */}
        <div className="grid grid-cols-2 gap-6">
          {metricData.map((metric, index) => (
            <div key={index} className="flex flex-col items-center">
              <h4 className="text-sm font-medium text-gray-600 mb-2">
                {metric.name}
              </h4>
              <div className="relative w-28 h-28">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { value: metric.value },
                        { value: 10 - metric.value },
                      ]}
                      dataKey="value"
                      startAngle={90}
                      endAngle={-270}
                      innerRadius={35}
                      outerRadius={45}
                      stroke="none"
                    >
                      <Cell fill={metric.color} />
                      <Cell fill="#E5E7EB" />
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center text-lg font-semibold text-gray-800">
                  {metric.value}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
