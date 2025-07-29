// app/page.tsx or pages/index.tsx (depending on your structure)

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 text-center">
      <Card className="max-w-2xl w-full p-8 shadow-xl rounded-2xl bg-white">
        <CardContent>
          <h1 className="text-5xl font-bold mb-4 text-gray-900">
            Ace Your AI Interview
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Prepare for interviews with our intelligent AI platform. Practice,
            learn, and improve—all in one place.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/dashboard">
              <Button className="w-full sm:w-auto">Go to Dashboard</Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" className="w-full sm:w-auto">
                Login
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
