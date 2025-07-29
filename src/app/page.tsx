// src/app/page.tsx
"use client";

import { createClient } from "@/utils/supabase/client";
import Link from "next/link";

import React, { useEffect, useState } from "react";
import {
  Award,
  Lightbulb,
  TrendingUp,
  Users,
  Brain,
  Clock,
} from "lucide-react"; // Icons for features
import { motion } from "framer-motion";
import { NavbarDemo } from "@/components/MainNabar";

const LandingPage = () => {
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    checkUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [supabase]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center bg-background text-foreground p-0 overflow-x-hidden">
      <NavbarDemo />

      {/* Main content sections */}
      <main className="relative z-10 w-full max-w-7xl mx-auto py-16 sm:py-24 lg:py-32 px-4 md:px-6">
        {/* Hero Section */}
        <motion.section
          id="hero"
          className="min-h-[calc(100vh-100px)] flex flex-col items-center justify-center text-center py-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <motion.h1
            className="text-6xl md:text-7xl lg:text-8xl font-extrabold mb-6 text-foreground leading-tight"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Elevate Your Interview Game with{" "}
            <span className="text-primary">EchoHire</span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground mb-10 leading-relaxed max-w-3xl"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Your AI-powered partner for perfecting interview skills. Practice
            with realistic simulations, get instant feedback, and confidently
            land your dream job.
          </motion.p>

          {user ? (
            <Link href="/dashboard">
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.97 }}
                className="px-10 py-5 bg-primary text-primary-foreground text-xl font-semibold rounded-full shadow-lg hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.6 }}
              >
                Go to Dashboard
              </motion.button>
            </Link>
          ) : (
            <Link href="/login">
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.97 }}
                className="px-10 py-5 bg-primary text-primary-foreground text-xl font-semibold rounded-full shadow-lg hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.6 }}
              >
                Get Started Today
              </motion.button>
            </Link>
          )}
        </motion.section>
        <div className="border-b border-border my-20 opacity-0 animate-fade-in animation-delay-200"></div>{" "}
        {/* Separator */}
        {/* Features/What We Offer Section */}
        <motion.section
          id="features"
          className="py-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.15 },
            },
          }}
        >
          <motion.h2
            className="text-5xl font-bold text-center mb-12 text-foreground"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            What EchoHire Offers
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              {
                icon: <Brain className="h-16 w-16 text-primary mb-4" />,
                title: "AI-Powered Mock Interviews",
                desc: "Engage in highly realistic interview simulations with our intelligent AI, designed to challenge and adapt to your responses.",
              },
              {
                icon: <Lightbulb className="h-16 w-16 text-primary mb-4" />,
                title: "Instant, Detailed Feedback",
                desc: "Receive comprehensive feedback on your answers, body language (via prompts), and communication style immediately after each session.",
              },
              {
                icon: <Clock className="h-16 w-16 text-primary mb-4" />,
                title: "Flexible Practice Schedule",
                desc: "Train anytime, anywhere, at your own pace. Our platform is available 24/7 to fit your busy schedule.",
              },
              {
                icon: <Award className="h-16 w-16 text-primary mb-4" />,
                title: "Tailored Interview Scenarios",
                desc: "Customize interviews based on job roles, industries, and experience levels to ensure relevant and targeted practice.",
              },
              {
                icon: <TrendingUp className="h-16 w-16 text-primary mb-4" />,
                title: "Progress Tracking & History",
                desc: "Review past interview sessions, analyze your improvements, and identify areas that still need work over time.",
              },
              {
                icon: <Users className="h-16 w-16 text-primary mb-4" />,
                title: "Boost Confidence",
                desc: "Reduce interview anxiety by practicing in a safe, judgment-free environment, building confidence for the real deal.",
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                className="flex flex-col items-center text-center p-6 rounded-lg bg-card border border-border shadow-md transition-transform transform hover:scale-105 duration-300"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.1 }}
              >
                {feature.icon}
                <h3 className="text-2xl font-semibold mb-3 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
        <div className="border-b border-border my-20 opacity-0 animate-fade-in animation-delay-1100"></div>
        {/* How It Works Section - Refined Line Animation */}
        <motion.section
          id="how-it-works"
          className="py-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.18 },
            },
          }}
        >
          <motion.h2
            className="text-5xl font-bold text-center mb-16 text-foreground"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            How EchoHire Works
          </motion.h2>
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-20">
            {/* Desktop Lines */}
            <div className="hidden md:block absolute left-[calc(100%/6 + 1.25rem)] top-[50%] -translate-y-1/2 w-[calc(100%/3 - 2.5rem + 2.5rem - 10px)] h-1 bg-primary rounded-full z-0 origin-left animate-draw-line animation-delay-1800"></div>
            <div className="hidden md:block absolute left-[calc(200%/6 + 1.25rem + 100%/3 - 2.5rem - 10px)] top-[50%] -translate-y-1/2 w-[calc(100%/3 - 2.5rem + 2.5rem - 10px)] h-1 bg-primary rounded-full z-0 origin-left animate-draw-line animation-delay-2400"></div>
            {/* Mobile Lines */}
            <div className="absolute left-1/2 -translate-x-1/2 top-[calc(5rem + 2.5rem)] h-[calc(100%/3 - 5rem - 2.5rem)] w-1 bg-primary rounded-full z-0 origin-top animate-draw-line-vertical animation-delay-1800 md:hidden"></div>
            <div className="absolute left-1/2 -translate-x-1/2 top-[calc(100%/3*2 + 5rem + 2.5rem)] h-[calc(100%/3 - 5rem - 2.5rem)] w-1 bg-primary rounded-full z-0 origin-top animate-draw-line-vertical animation-delay-2400 md:hidden"></div>

            {[
              {
                step: 1,
                title: "Set Up Your Interview",
                desc: "Choose your desired job role, industry, and experience level to tailor your practice session.",
              },
              {
                step: 2,
                title: "Engage with AI",
                desc: "Begin your one-on-one mock interview. Respond to AI-generated questions as you would in a real interview.",
              },
              {
                step: 3,
                title: "Receive Instant Feedback",
                desc: "Get immediate, constructive feedback on your answers and performance, helping you identify areas for improvement.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.2 }}
              >
                <div className="w-20 h-20 flex items-center justify-center rounded-full bg-primary text-primary-foreground text-3xl font-bold mb-4 z-10">
                  {item.step}
                </div>
                <h3 className="text-2xl font-semibold mb-2 text-foreground">
                  {item.title}
                </h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
        <div className="border-b border-border my-20 opacity-0 animate-fade-in animation-delay-2800"></div>
        {/* Call to Action Section (Repeated for emphasis) */}
        <motion.section
          id="cta-bottom"
          className="py-20 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h2
            className="text-5xl font-bold mb-6 text-foreground"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Ready to Ace Your Next Interview?
          </motion.h2>
          <motion.p
            className="text-xl text-muted-foreground mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Join thousands of students who are transforming their interview
            skills with EchoHire.
          </motion.p>
          {user ? (
            <Link href="/dashboard">
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.97 }}
                className="px-10 py-5 bg-primary text-primary-foreground text-xl font-semibold rounded-full shadow-lg hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.5 }}
              >
                Continue to Dashboard
              </motion.button>
            </Link>
          ) : (
            <Link href="/login">
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.97 }}
                className="px-10 py-5 bg-primary text-primary-foreground text-xl font-semibold rounded-full shadow-lg hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.5 }}
              >
                Start Your Free Practice
              </motion.button>
            </Link>
          )}
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="w-full text-center py-8 bg-card border-t border-border text-sm text-muted-foreground opacity-0 animate-fade-in animation-delay-3000">
        <p>© {new Date().getFullYear()} EchoHire. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
