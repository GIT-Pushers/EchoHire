import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ChevronDown, Plus } from "lucide-react";

const HelpPage = () => {
  const faqs = [
    {
      question: "What is EchoHire?",
      answer:
        "EchoHire is an online platform that uses Artificial Intelligence to conduct mock interviews, providing students with a realistic practice environment and instant feedback to improve their interview skills.",
    },
    {
      question: "How do I start an interview?",
      answer:
        'Navigate to the "Start Interview" section from the sidebar. You\'ll be able to select your desired job role, experience level, and other preferences before starting your AI-powered interview session.',
    },
    {
      question: "Can I choose the type of interview?",
      answer:
        'Yes, during the "Create Interview" process, you can specify the job title, desired skills, and experience level. The AI will then tailor the interview questions to match your selections.',
    },
    {
      question: "How does the AI provide feedback?",
      answer:
        "After each answer or at the end of the interview session, the AI analyzes your responses for clarity, relevance, confidence, and completeness. It provides written feedback, highlighting strengths and areas for improvement.",
    },
    {
      question: "Is my interview data saved?",
      answer:
        'Yes, your past interview sessions and feedback are saved in your "Session History" for you to review and track your progress over time.',
    },
    {
      question: "What if I have technical issues?",
      answer:
        "Please ensure your microphone is working correctly and you have a stable internet connection. If issues persist, try refreshing the page or contacting support (if available).",
    },
    {
      question: "Can I customize the AI's persona?",
      answer:
        "Currently, the AI maintains a professional and neutral interviewer persona. Future updates might include options for customizing the interview style.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Help Center
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get the most out of EchoHire with our comprehensive guides and FAQs
          </p>
        </section>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* About Card */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-2xl">About EchoHire</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                EchoHire is designed to revolutionize the way students prepare
                for job interviews. Our platform provides a unique, one-to-one
                interview training experience powered by advanced Artificial
                Intelligence.
              </p>
              <p className="text-muted-foreground">
                You can engage in realistic mock interviews with an AI
                interviewer that simulates real-world scenarios, asks relevant
                questions, and provides instant, constructive feedback.
              </p>
              <p className="text-muted-foreground">
                Whether you are preparing for your first job, a career change,
                or aiming for a specific role, our AI helps you hone your
                communication skills, boost your confidence, and refine your
                answers in a pressure-free environment.
              </p>
              <div className="pt-4">
                <Button variant="outline" className="gap-2">
                  Watch Tutorial
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Links Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Quick Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start gap-2">
                Getting Started Guide
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                Interview Tips
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                Troubleshooting
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-12" />

        {/* FAQ Section */}
        <section className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>

          <Accordion type="single" collapsible className="w-full space-y-2">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border rounded-lg overflow-hidden"
              >
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <div className="flex items-center space-x-4">
                    <Plus className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200" />
                    <span className="text-lg font-medium text-left">
                      {faq.question}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 pt-0 text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* Support CTA */}
        <section className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl">Still need help?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                Our support team is here to help you with any questions or
                issues you might have.
              </p>
              <Button size="lg">Contact Support</Button>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default HelpPage;
