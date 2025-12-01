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
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
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

      <div className="max-h-[90vh] flex flex-col justify-center items-center bg-background px-4 my-10">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm p-8 bg-background border hover:border-primary transition rounded-lg border-border space-y-6 hover:transition-colors"
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
    </>
  );
}
