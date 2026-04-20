import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, Lock, Shield, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import GhanaButton from "../components/GhanaButton";
import { useAuth } from "../hooks/useAuth";
import { useIsCallerAdmin, useLogin } from "../hooks/useQueries";

function hashPassword(password: string): string {
  return btoa(password);
}

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { mutateAsync, isPending } = useLogin();
  const { refetch: fetchIsAdmin } = useIsCallerAdmin();

  const [ghanaCardId, setGhanaCardId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{
    ghanaCardId?: string;
    password?: string;
    general?: string;
  }>({});

  function validate(): boolean {
    const next: { ghanaCardId?: string; password?: string } = {};
    if (!ghanaCardId.trim()) next.ghanaCardId = "Ghana Card ID is required.";
    if (!password) next.password = "Password is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setErrors({});

    try {
      const result = await mutateAsync({
        ghanaCardId: ghanaCardId.trim().toUpperCase(),
        passwordHash: hashPassword(password),
      });

      if (result.__kind__ === "ok") {
        const { token } = result.ok;
        // Resolve admin status server-side right after login
        const adminResult = await fetchIsAdmin();
        const isAdmin = adminResult.data === true;
        login(ghanaCardId.trim().toUpperCase(), token, isAdmin);
        toast.success("Welcome back! Redirecting…");
        navigate({ to: isAdmin ? "/admin" : "/vote" });
      } else {
        setErrors({
          general:
            result.err.message ?? "Invalid credentials. Please try again.",
        });
      }
    } catch {
      setErrors({ general: "Something went wrong. Please try again." });
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background flex items-center justify-center px-4 py-12">
      {/* Background top stripe */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        aria-hidden
      >
        <div className="absolute top-0 left-0 right-0 h-1 flex">
          <div className="flex-1 bg-primary" />
          <div className="flex-1 bg-secondary" />
          <div className="flex-1 bg-accent" />
        </div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Branding header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border-2 border-primary/30 mb-4">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-display-medium text-foreground">
            Ghana Votes 2024
          </h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Secure Presidential Election Platform
          </p>
          <div className="flex justify-center gap-1 mt-3">
            <div className="w-8 h-1 rounded-full bg-primary" />
            <div className="w-8 h-1 rounded-full bg-secondary" />
            <div className="w-8 h-1 rounded-full bg-accent" />
          </div>
        </div>

        <Card className="card-elevated shadow-lg">
          <CardHeader className="pb-0 pt-6 px-6">
            <h2 className="text-lg font-semibold text-foreground">Sign In</h2>
            <p className="text-sm text-muted-foreground">
              Enter your Ghana Card ID and password
            </p>
          </CardHeader>

          <CardContent className="px-6 py-6">
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* General error */}
              {errors.general && (
                <div
                  data-ocid="login.error_state"
                  className="rounded-lg bg-primary/10 border border-primary/30 text-primary px-4 py-3 text-sm font-medium"
                  role="alert"
                >
                  {errors.general}
                </div>
              )}

              {/* Ghana Card ID */}
              <div className="space-y-1.5">
                <Label htmlFor="ghanaCardId" className="text-sm font-medium">
                  Ghana Card ID
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="ghanaCardId"
                    data-ocid="login.ghana_card_input"
                    type="text"
                    placeholder="GHA-XXXXXXXXX-X"
                    value={ghanaCardId}
                    onChange={(e) => setGhanaCardId(e.target.value)}
                    onBlur={() => {
                      if (!ghanaCardId.trim()) {
                        setErrors((prev) => ({
                          ...prev,
                          ghanaCardId: "Ghana Card ID is required.",
                        }));
                      } else {
                        setErrors((prev) => ({
                          ...prev,
                          ghanaCardId: undefined,
                        }));
                      }
                    }}
                    className="pl-9 uppercase placeholder:normal-case"
                    autoComplete="username"
                    aria-describedby={
                      errors.ghanaCardId ? "ghanaCardId-error" : undefined
                    }
                    aria-invalid={!!errors.ghanaCardId}
                  />
                </div>
                {errors.ghanaCardId && (
                  <p
                    id="ghanaCardId-error"
                    data-ocid="login.ghana_card_input.field_error"
                    className="text-xs text-primary mt-1"
                  >
                    {errors.ghanaCardId}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    data-ocid="login.password_input"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() => {
                      if (!password) {
                        setErrors((prev) => ({
                          ...prev,
                          password: "Password is required.",
                        }));
                      } else {
                        setErrors((prev) => ({ ...prev, password: undefined }));
                      }
                    }}
                    className="pl-9 pr-10"
                    autoComplete="current-password"
                    aria-describedby={
                      errors.password ? "password-error" : undefined
                    }
                    aria-invalid={!!errors.password}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    data-ocid="login.toggle_password"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p
                    id="password-error"
                    data-ocid="login.password_input.field_error"
                    className="text-xs text-primary mt-1"
                  >
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Submit */}
              <GhanaButton
                type="submit"
                ghanaVariant="primary"
                className="w-full h-11 text-base mt-2"
                disabled={isPending}
                data-ocid="login.submit_button"
              >
                {isPending ? "Signing in…" : "Sign In"}
              </GhanaButton>

              {isPending && (
                <div
                  data-ocid="login.loading_state"
                  className="text-center text-xs text-muted-foreground"
                >
                  Verifying credentials…
                </div>
              )}
            </form>

            <div className="mt-6 pt-5 border-t border-border text-center text-sm text-muted-foreground">
              {"Don't have an account? "}
              <a
                href="/register"
                data-ocid="login.register_link"
                className="text-accent font-semibold hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Register to vote
              </a>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Electoral Commission of Ghana &bull; Secure &amp; Transparent Voting
        </p>
      </div>
    </div>
  );
}
