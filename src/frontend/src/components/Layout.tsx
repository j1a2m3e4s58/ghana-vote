import { Button } from "@/components/ui/button";
import { Link, useLocation } from "@tanstack/react-router";
import { LayoutDashboard, LogOut, Users, Vote } from "lucide-react";
import type { ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";

interface LayoutProps {
  children: ReactNode;
}

// Ghana flag stripe accent bar
function FlagStripes() {
  return (
    <div className="flex h-1 w-full overflow-hidden">
      <div className="flex-1 bg-primary" />
      <div className="flex-1 bg-secondary" />
      <div className="flex-1 bg-accent" />
    </div>
  );
}

export default function Layout({ children }: LayoutProps) {
  const { isAuthenticated, isAdmin, logout, ghanaCardId } = useAuth();
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(`${path}/`);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-xs sticky top-0 z-50">
        <FlagStripes />
        <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
          {/* Brand */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group"
            data-ocid="nav.brand_link"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 shadow-xs">
              {/* Ghana flag mini */}
              <div className="w-full h-full flex flex-col">
                <div className="flex-1 bg-primary" />
                <div className="flex-1 bg-secondary flex items-center justify-center">
                  <span className="text-[8px] leading-none">★</span>
                </div>
                <div className="flex-1 bg-accent" />
              </div>
            </div>
            <div className="min-w-0">
              <span className="font-display font-bold text-foreground text-lg leading-none block truncate">
                Ghana Votes
              </span>
              <span className="text-xs text-muted-foreground leading-none">
                2024 Presidential Election
              </span>
            </div>
          </Link>

          {/* Nav */}
          <nav className="flex items-center gap-1" aria-label="Main navigation">
            {isAuthenticated && (
              <Link
                to="/vote"
                data-ocid="nav.vote_link"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-smooth ${
                  isActive("/vote")
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <Vote className="w-4 h-4 flex-shrink-0" />
                <span className="hidden sm:inline">Vote</span>
              </Link>
            )}

            {isAdmin && (
              <>
                <Link
                  to="/admin"
                  data-ocid="nav.admin_link"
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-smooth ${
                    isActive("/admin") && !isActive("/admin/candidates")
                      ? "bg-accent/10 text-accent"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4 flex-shrink-0" />
                  <span className="hidden sm:inline">Dashboard</span>
                </Link>
                <Link
                  to="/admin/candidates"
                  data-ocid="nav.candidates_link"
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-smooth ${
                    isActive("/admin/candidates")
                      ? "bg-accent/10 text-accent"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <Users className="w-4 h-4 flex-shrink-0" />
                  <span className="hidden sm:inline">Candidates</span>
                </Link>
              </>
            )}

            {!isAuthenticated ? (
              <div className="flex items-center gap-2 ml-2">
                <Link to="/login" data-ocid="nav.login_link">
                  <Button
                    variant="outline"
                    size="sm"
                    className="transition-smooth"
                  >
                    Sign in
                  </Button>
                </Link>
                <Link to="/register" data-ocid="nav.register_link">
                  <Button
                    size="sm"
                    className="transition-smooth bg-primary text-primary-foreground hover:opacity-90"
                  >
                    Register
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-2 ml-2">
                {ghanaCardId && (
                  <span
                    className="text-xs text-muted-foreground hidden md:block max-w-[120px] truncate"
                    title={ghanaCardId}
                  >
                    {ghanaCardId}
                  </span>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  data-ocid="nav.logout_button"
                  className="text-muted-foreground hover:text-foreground transition-smooth"
                  aria-label="Log out"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline ml-1.5">Logout</span>
                </Button>
              </div>
            )}
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 bg-background" id="main-content">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-muted/40 border-t border-border py-6">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-sm overflow-hidden flex-shrink-0">
              <div className="w-full h-full flex flex-col">
                <div className="flex-1 bg-primary" />
                <div className="flex-1 bg-secondary" />
                <div className="flex-1 bg-accent" />
              </div>
            </div>
            <span className="text-sm font-medium text-foreground">
              Ghana Votes 2024
            </span>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
