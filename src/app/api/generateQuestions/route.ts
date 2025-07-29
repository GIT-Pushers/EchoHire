import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Google Generative AI client
// Ensure your GOOGLE_API_KEY is securely stored in your .env.local file
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Prompt is required and must be a string." },
        { status: 400 }
      );
    }

    // For text-only input, use the gemini-pro model
    // This is equivalent to "qwen/qwen3-coder:free" or "openai/gpt-3.5-turbo" for text generation
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Send the prompt to the Gemini model
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7, // Matches the temperature from your OpenRouter setup
        maxOutputTokens: 2048, // A common default, adjust as needed
      },
    });

    const response = await result.response;
    const generatedText = response.text();

    if (!generatedText) {
      console.error("Gemini API returned no content.");
      return NextResponse.json(
        { error: "Failed to get a response from Gemini AI." },
        { status: 500 }
      );
    }

    // The structure of the successful response is { result: "..." }
    return NextResponse.json({ result: generatedText }, { status: 200 });
  } catch (error) {
    console.error("Unexpected Server Error:", error);
    // Google Generative AI errors often have specific properties you might want to log
    // For example, if it's an API error, `error.details` might be available.
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown server error",
      },
      { status: 500 }
    );
  }
}
