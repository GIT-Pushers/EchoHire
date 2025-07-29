"use client";

import LoginGithub from "@/components/LoginGithub";
import LoginGoogle from "@/components/LoginGoogle";
import {
  Sparkles,
  Mic,
  Bot,
  BarChart2,
  Clock,
  CheckCircle,
} from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex flex-col">
      <div className="flex-1 flex items-center">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
            {/* Left side - Features */}
            <div className="w-full lg:w-1/2 space-y-6 lg:space-y-8">
              <div className="flex items-center gap-3">
                <Sparkles className="w-8 h-8 text-indigo-600 animate-pulse" />
                <h1 className="text-3xl lg:text-4xl font-bold text-indigo-600">
                  Echo Hire
                </h1>
              </div>

              <h2 className="text-2xl lg:text-3xl font-bold text-gray-800">
                Master Your Interview Skills with AI
              </h2>

              <p className="text-lg text-gray-600">
                Practice with our voice-enabled AI recruiter and get instant
                feedback on your responses, tone, and clarity.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mic className="w-5 h-5 mt-1 text-indigo-500 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Voice-Powered Practice
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Respond naturally using your voice, just like a real
                      interview.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Bot className="w-5 h-5 mt-1 text-indigo-500 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      AI-Powered Feedback
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Get instant analysis on your answers, pacing, and
                      confidence.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <BarChart2 className="w-5 h-5 mt-1 text-indigo-500 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Performance Tracking
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Monitor your progress over time with detailed analytics.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                <div className="flex items-center gap-2 text-indigo-700">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">Quick Setup</span>
                </div>
                <p className="text-gray-600 text-sm mt-1">
                  Sign in with your preferred provider and start practicing in
                  seconds. No credit card required.
                </p>
              </div>
            </div>

            {/* Right side - Login Card */}
            <div className="w-full lg:w-1/3">
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-200">
                <div className="text-center mb-6">
                  <h1 className="text-2xl font-bold text-gray-800">
                    Welcome Back!
                  </h1>
                  <p className="text-sm text-gray-500 mt-2">
                    Sign in to continue your interview preparation
                  </p>
                </div>

                <div className="flex flex-col gap-4 mt-6">
                  <LoginGoogle />
                  <LoginGithub />
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>100% secure login</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>We never share your data</span>
                  </div>
                </div>

                <p className="text-xs text-gray-400 text-center mt-6">
                  By continuing, you agree to our Terms and Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-4 text-center">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Echo Hire. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
