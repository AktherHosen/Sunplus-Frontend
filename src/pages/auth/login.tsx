// src/components/LoginForm.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/auth-context";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router";

export default function LoginForm() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login | Sunplus Electricals</title>
        <meta
          name="description"
          content="Login to your Sunplus Electricals account to access your orders and profile."
        />
      </Helmet>

      <div className="min-h-[70vh] flex flex-col justify-center items-center px-4 py-12 bg-background">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-8 bg-card border border-border rounded-2xl space-y-6"
        >
          <h2 className="text-3xl font-bold text-center text-foreground">
            Welcome Back
          </h2>
          <p className="text-center text-sm text-muted-foreground">
            Login to continue to your dashboard
          </p>

          {error && (
            <div className="text-red-600 text-sm font-medium text-center">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-4">
            <div className="flex flex-col space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="flex flex-col space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                required
              />
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </div>
    </>
  );
}
