import { Link } from "@tanstack/react-router";
import { Home } from "lucide-react";
import GhanaButton from "../components/GhanaButton";

export default function NotFoundPage() {
  return (
    <div
      className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16"
      data-ocid="notfound.page"
    >
      {/* Ghana flag decoration */}
      <div className="flex gap-2 mb-8">
        <div className="w-4 h-16 rounded bg-primary" />
        <div className="w-4 h-16 rounded bg-secondary flex items-center justify-center">
          <span className="text-foreground text-xs">★</span>
        </div>
        <div className="w-4 h-16 rounded bg-accent" />
      </div>

      <h1 className="font-display font-bold text-6xl md:text-8xl text-primary mb-2">
        404
      </h1>
      <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-3">
        Page Not Found
      </h2>
      <p className="text-muted-foreground text-base md:text-lg max-w-sm mb-8">
        The page you're looking for doesn't exist or may have been moved.
      </p>

      <Link to="/">
        <GhanaButton
          ghanaVariant="primary"
          size="lg"
          data-ocid="notfound.home_button"
        >
          <Home className="w-4 h-4 mr-2" />
          Back to Home
        </GhanaButton>
      </Link>
    </div>
  );
}
