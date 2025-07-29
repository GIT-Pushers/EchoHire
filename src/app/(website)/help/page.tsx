// src/app/(website)/help/page.tsx
"use client";

import React, { useState } from 'react'; // Import useState for dropdown functionality

const HelpPage = () => {
  const faqs = [
    {
      question: "What is EchoHire?",
      answer: "EchoHire is an online platform that uses Artificial Intelligence to conduct mock interviews, providing students with a realistic practice environment and instant feedback to improve their interview skills.",
    },
    {
      question: "How do I start an interview?",
      answer: "Navigate to the \"Start Interview\" section from the sidebar. You'll be able to select your desired job role, experience level, and other preferences before starting your AI-powered interview session.",
    },
    {
      question: "Can I choose the type of interview?",
      answer: "Yes, during the \"Create Interview\" process, you can specify the job title, desired skills, and experience level. The AI will then tailor the interview questions to match your selections.",
    },
    {
      question: "How does the AI provide feedback?",
      answer: "After each answer or at the end of the interview session, the AI analyzes your responses for clarity, relevance, confidence, and completeness. It provides written feedback, highlighting strengths and areas for improvement.",
    },
    {
      question: "Is my interview data saved?",
      answer: "Yes, your past interview sessions and feedback are saved in your \"Session History\" for you to review and track your progress over time.",
    },
    {
      question: "What if I have technical issues?",
      answer: "Please ensure your microphone is working correctly and you have a stable internet connection. If issues persist, try refreshing the page or contacting support (if available).",
    },
    {
      question: "Can I customize the AI's persona?",
      answer: "Currently, the AI maintains a professional and neutral interviewer persona. Future updates might include options for customizing the interview style.",
    },
  ];

  // State to manage which FAQ item is open
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    // Outer container: using semantic colors that respond to dark/light mode
    <div className="min-h-screen bg-background text-foreground py-12 px-4 md:px-6 lg:px-8">
      <div className="w-full">
        {/* Header Section */}
        <div className="text-center px-4 md:px-6 mb-10">
          <h1 className="text-3xl font-bold mb-2">Help & Tips</h1>
          <p className="text-lg text-muted-foreground">Find information about the platform and answers to common questions.</p>
        </div>

        <div className="px-4 md:px-6">
          {/* About the Website Section */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">About EchoHire</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              **EchoHire** is designed to revolutionize the way students prepare for job interviews.
              Our platform provides a unique, one-to-one interview training experience powered by advanced Artificial Intelligence.
              You can engage in realistic mock interviews with an AI interviewer that simulates real-world scenarios, asks relevant questions, and provides instant, constructive feedback.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mt-4">
              Whether you're preparing for your first job, a career change, or aiming for a specific role,
              our AI helps you hone your communication skills, boost your confidence, and refine your answers
              in a pressure-free environment. Train anytime, anywhere, and master your interview performance!
            </p>
          </section>

          {/* Separator */}
          <div className="border-b border-border my-10"></div>

          {/* FAQ Section (Custom Dropdowns) */}
          <section>
            <h2 className="text-2xl font-semibold mb-6 text-foreground text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-border rounded-lg overflow-hidden">
                  <button
                    className="flex justify-between items-center w-full p-4 text-left font-medium text-lg bg-card hover:bg-muted transition-colors duration-200"
                    onClick={() => toggleFaq(index)}
                  >
                    {faq.question}
                    {/* Simple plus/minus icon */}
                    <span className={`transform transition-transform duration-200 ${openFaqIndex === index ? 'rotate-45' : ''}`}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2.5"
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </span>
                  </button>
                  {openFaqIndex === index && (
                    <div className="p-4 pt-0 bg-card text-muted-foreground">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;