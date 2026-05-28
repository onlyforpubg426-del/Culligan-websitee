import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 text-center">
      <div className="text-8xl font-black text-primary/10 mb-6">404</div>
      <h1 className="text-3xl font-bold text-slate-900 mb-3">Page not found</h1>
      <p className="text-muted-foreground mb-8 max-w-sm">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Button asChild className="rounded-full px-8">
        <Link href="/">Back to Home</Link>
      </Button>
    </div>
  );
}
