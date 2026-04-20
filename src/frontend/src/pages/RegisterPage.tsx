import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "@tanstack/react-router";
import {
  CheckCircle,
  Eye,
  EyeOff,
  Lock,
  Phone,
  Shield,
  User,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import GhanaButton from "../components/GhanaButton";
import { useRegisterVoter } from "../hooks/useQueries";

const GHANA_CARD_REGEX = /^GHA-[0-9]{9}$/;
const PHONE_REGEX = /^\+?[0-9]{9,15}$/;

function hashPassword(password: string): string {
  return btoa(password);
}

interface FormErrors {
  ghanaCardId?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useRegisterVoter();

  const [ghanaCardId, setGhanaCardId] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [success, setSuccess] = useState(false);

  function validateField(
    name: keyof Omit<FormErrors, "general">,
    value: string,
    other?: string,
  ): string | undefined {
    switch (name) {
      case "ghanaCardId":
        if (!value.trim()) return "Ghana Card ID is required.";
        if (!GHANA_CARD_REGEX.test(value.trim().toUpperCase()))
          return "Format must be GHA-XXXXXXXXX (e.g. GHA-123456789).";
        return undefined;
      case "phone":
        if (!value.trim()) return "Phone number is required.";
        if (!PHONE_REGEX.test(value.trim()))
          return "Enter a valid phone number.";
        return undefined;
      case "password":
        if (!value) return "Password is required.";
        if (value.length < 8) return "Password must be at least 8 characters.";
        return undefined;
      case "confirmPassword":
        if (!value) return "Please confirm your password.";
        if (value !== other) return "Passwords do not match.";
        return undefined;
    }
  }

  function validateAll(): boolean {
    const next: FormErrors = {
      ghanaCardId: validateField("ghanaCardId", ghanaCardId),
      phone: validateField("phone", phone),
      password: validateField("password", password),
      confirmPassword: validateField(
        "confirmPassword",
        confirmPassword,
        password,
      ),
    };
    const cleaned = Object.fromEntries(
      Object.entries(next).filter(([, v]) => v !== undefined),
    ) as FormErrors;
    setErrors(cleaned);
    return Object.keys(cleaned).length === 0;
  }

  function onBlur(name: keyof Omit<FormErrors, "general">, value: string) {
    const err = validateField(
      name,
      value,
      name === "confirmPassword" ? password : undefined,
    );
    setErrors((prev) => ({ ...prev, [name]: err }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateAll()) return;
    setErrors({});

    try {
      const result = await mutateAsync({
        ghanaCardId: ghanaCardId.trim().toUpperCase(),
        phone: phone.trim(),
        passwordHash: hashPassword(password),
      });

      if (result.__kind__ === "ok") {
        setSuccess(true);
        toast.success("Registration successful! You can now sign in.");
        setTimeout(() => navigate({ to: "/login" }), 2500);
      } else {
        setErrors({
          general:
            result.err.message ?? "Registration failed. Please try again.",
        });
      }
    } catch {
      setErrors({ general: "Something went wrong. Please try again." });
    }
  }

  if (success) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-background flex items-center justify-center px-4 py-12">
        <div
          data-ocid="register.success_state"
          className="text-center max-w-sm"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 border-2 border-accent/30 mb-5">
            <CheckCircle className="w-8 h-8 text-accent" />
          </div>
          <h2 className="text-display-medium text-foreground mb-2">
            Registration Successful!
          </h2>
          <p className="text-muted-foreground text-sm mb-6">
            Your voter account has been created. Redirecting to sign in…
          </p>
          <div className="flex justify-center gap-1">
            <div className="w-8 h-1 rounded-full bg-primary" />
            <div className="w-8 h-1 rounded-full bg-secondary" />
            <div className="w-8 h-1 rounded-full bg-accent" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background flex items-center justify-center px-4 py-12">
      {/* Top stripe */}
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
        {/* Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 border-2 border-accent/30 mb-4">
            <Shield className="w-8 h-8 text-accent" />
          </div>
          <h1 className="text-display-medium text-foreground">
            Ghana Votes 2024
          </h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Register as a Verified Voter
          </p>
          <div className="flex justify-center gap-1 mt-3">
            <div className="w-8 h-1 rounded-full bg-primary" />
            <div className="w-8 h-1 rounded-full bg-secondary" />
            <div className="w-8 h-1 rounded-full bg-accent" />
          </div>
        </div>

        <Card className="card-elevated shadow-lg">
          <CardHeader className="pb-0 pt-6 px-6">
            <h2 className="text-lg font-semibold text-foreground">
              Create Voter Account
            </h2>
            <p className="text-sm text-muted-foreground">
              Use your official Ghana Card details to register
            </p>
          </CardHeader>

          <CardContent className="px-6 py-6">
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* General error */}
              {errors.general && (
                <div
                  data-ocid="register.error_state"
                  className="rounded-lg bg-primary/10 border border-primary/30 text-primary px-4 py-3 text-sm font-medium"
                  role="alert"
                >
                  {errors.general}
                </div>
              )}

              {/* Ghana Card ID */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="reg-ghanaCardId"
                  className="text-sm font-medium"
                >
                  Ghana Card ID
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="reg-ghanaCardId"
                    data-ocid="register.ghana_card_input"
                    type="text"
                    placeholder="GHA-123456789"
                    value={ghanaCardId}
                    onChange={(e) => setGhanaCardId(e.target.value)}
                    onBlur={() => onBlur("ghanaCardId", ghanaCardId)}
                    className="pl-9 uppercase placeholder:normal-case"
                    autoComplete="username"
                    aria-describedby={
                      errors.ghanaCardId ? "reg-ghanaCardId-error" : undefined
                    }
                    aria-invalid={!!errors.ghanaCardId}
                  />
                </div>
                {errors.ghanaCardId && (
                  <p
                    id="reg-ghanaCardId-error"
                    data-ocid="register.ghana_card_input.field_error"
                    className="text-xs text-primary mt-1"
                  >
                    {errors.ghanaCardId}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <Label htmlFor="reg-phone" className="text-sm font-medium">
                  Phone Number
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="reg-phone"
                    data-ocid="register.phone_input"
                    type="tel"
                    placeholder="+233 XX XXX XXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    onBlur={() => onBlur("phone", phone)}
                    className="pl-9"
                    autoComplete="tel"
                    aria-describedby={
                      errors.phone ? "reg-phone-error" : undefined
                    }
                    aria-invalid={!!errors.phone}
                  />
                </div>
                {errors.phone && (
                  <p
                    id="reg-phone-error"
                    data-ocid="register.phone_input.field_error"
                    className="text-xs text-primary mt-1"
                  >
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <Label htmlFor="reg-password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="reg-password"
                    data-ocid="register.password_input"
                    type={showPassword ? "text" : "password"}
                    placeholder="Minimum 8 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() => onBlur("password", password)}
                    className="pl-9 pr-10"
                    autoComplete="new-password"
                    aria-describedby={
                      errors.password ? "reg-password-error" : undefined
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
                    data-ocid="register.toggle_password"
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
                    id="reg-password-error"
                    data-ocid="register.password_input.field_error"
                    className="text-xs text-primary mt-1"
                  >
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-1.5">
                <Label htmlFor="reg-confirm" className="text-sm font-medium">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="reg-confirm"
                    data-ocid="register.confirm_password_input"
                    type={showConfirm ? "text" : "password"}
                    placeholder="Re-enter your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onBlur={() => onBlur("confirmPassword", confirmPassword)}
                    className="pl-9 pr-10"
                    autoComplete="new-password"
                    aria-describedby={
                      errors.confirmPassword ? "reg-confirm-error" : undefined
                    }
                    aria-invalid={!!errors.confirmPassword}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={
                      showConfirm
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                    data-ocid="register.toggle_confirm_password"
                  >
                    {showConfirm ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p
                    id="reg-confirm-error"
                    data-ocid="register.confirm_password_input.field_error"
                    className="text-xs text-primary mt-1"
                  >
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Submit */}
              <GhanaButton
                type="submit"
                ghanaVariant="accent"
                className="w-full h-11 text-base mt-2"
                disabled={isPending}
                data-ocid="register.submit_button"
              >
                {isPending ? "Creating Account…" : "Register to Vote"}
              </GhanaButton>

              {isPending && (
                <div
                  data-ocid="register.loading_state"
                  className="text-center text-xs text-muted-foreground"
                >
                  Registering your voter account…
                </div>
              )}
            </form>

            <div className="mt-6 pt-5 border-t border-border text-center text-sm text-muted-foreground">
              {"Already registered? "}
              <a
                href="/login"
                data-ocid="register.login_link"
                className="text-primary font-semibold hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Sign in here
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
