// src/components/LoginForm.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/auth-context";
import { useState } from "react";

export default function LoginForm() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await login(email, password);
      console.log(res);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex flex-col justify-center items-center bg-background px-4">
      {/* Footer Links at the Top */}
      {/* Login Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-8 bg-background border hover:border-primary transition rounded-lg  border-border space-y-6 hover:transition-colors"
      >
        <h2 className="text-2xl font-bold text-center text-foreground">
          Welcome Back
        </h2>

        <div className="flex flex-col gap-2">
          <Label htmlFor="email" className="font-medium">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="focus:ring-primary focus:border-primary rounded-md"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="password" className="font-medium">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            required
            className="focus:ring-primary focus:border-primary rounded-md"
          />
        </div>

        <Button
          type="submit"
          className="w-full py-2.5 bg-primary text-white font-semibold hover:bg-primary/90 transition-all rounded-lg"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </div>
  );
}
