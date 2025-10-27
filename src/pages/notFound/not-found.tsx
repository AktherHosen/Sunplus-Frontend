import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-muted-foreground mb-6">
        The page you are looking for does not exist or has been moved.
      </p>
      <Button variant="outline" onClick={() => navigate("/")}>
        Go Back Home
      </Button>
    </div>
  );
}
