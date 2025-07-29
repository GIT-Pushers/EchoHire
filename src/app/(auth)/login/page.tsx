import LoginGithub from "@/components/LoginGithub";
import LoginGoogle from "@/components/LoginGoogle";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8">Sign in</h1>

        <div className="flex flex-col gap-4">
          <LoginGithub />
          <LoginGoogle />
        </div>
      </div>
    </main>
  );
}
