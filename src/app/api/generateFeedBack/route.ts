import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini client
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

export async function POST(req: NextRequest) {
  try {
    const { transcript } = await req.json();

    if (!transcript || typeof transcript !== "string") {
      return NextResponse.json(
        { error: "Transcript is required and must be a string." },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-pro" });

    const prompt = `
You are an AI interview evaluator. Analyze the following transcript and provide a JSON response with:

- communication (1–10)
- confidence (1–10)
- technicalKnowledge (1–10)
- collaboration (1–10)
- hirePercentage (0–100): estimated chance of being hired
- suggestion (70 words max): brief advice for improvement

Respond only with a valid JSON object like:
{
  "communication": 8,
  "confidence": 7,
  "technicalKnowledge": 9,
  "collaboration": 6,
  "hirePercentage": 85,
  "suggestion": "You demonstrated good knowledge and communication. To improve further, work on giving more structured answers and showing stronger confidence when discussing your projects. Keep practicing mock interviews and refine how you present yourself."
}

Transcript:
"""
${transcript}
"""
    `.trim();

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.5,
        maxOutputTokens: 1024,
      },
    });

    const response = await result.response;
    const text = response.text();

    try {
      const parsed = JSON.parse(text);
      return NextResponse.json(parsed, { status: 200 });
    } catch (parseError) {
      console.error("Failed to parse JSON from Gemini output:", text);
      return NextResponse.json(
        { error: "Gemini output is not valid JSON." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Unexpected Server Error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown server error",
      },
      { status: 500 }
    );
  }
}
