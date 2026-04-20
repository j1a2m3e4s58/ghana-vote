import { u as useNavigate, a as useAuth, r as reactExports, j as jsxRuntimeExports, G as GhanaButton, b as ue } from "./index-Bkav72OT.js";
import { C as Card, a as CardHeader, b as CardContent } from "./card-C3mNnfdI.js";
import { L as Label, I as Input } from "./label-RiMzNpXj.js";
import { u as useLogin, a as useIsCallerAdmin } from "./useQueries-C7TDwMkU.js";
import { S as Shield, E as EyeOff, a as Eye } from "./shield-BZYz89LK.js";
import { U as User } from "./user-DCrQr0VU.js";
import { L as Lock } from "./lock-BZ7G4CrT.js";
function hashPassword(password) {
  return btoa(password);
}
function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { mutateAsync, isPending } = useLogin();
  const { refetch: fetchIsAdmin } = useIsCallerAdmin();
  const [ghanaCardId, setGhanaCardId] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const [errors, setErrors] = reactExports.useState({});
  function validate() {
    const next = {};
    if (!ghanaCardId.trim()) next.ghanaCardId = "Ghana Card ID is required.";
    if (!password) next.password = "Password is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setErrors({});
    try {
      const result = await mutateAsync({
        ghanaCardId: ghanaCardId.trim().toUpperCase(),
        passwordHash: hashPassword(password)
      });
      if (result.__kind__ === "ok") {
        const { token } = result.ok;
        const adminResult = await fetchIsAdmin();
        const isAdmin = adminResult.data === true;
        login(ghanaCardId.trim().toUpperCase(), token, isAdmin);
        ue.success("Welcome back! Redirecting…");
        navigate({ to: isAdmin ? "/admin" : "/vote" });
      } else {
        setErrors({
          general: result.err.message ?? "Invalid credentials. Please try again."
        });
      }
    } catch {
      setErrors({ general: "Something went wrong. Please try again." });
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-[calc(100vh-4rem)] bg-background flex items-center justify-center px-4 py-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute inset-0 overflow-hidden pointer-events-none",
        "aria-hidden": true,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-0 left-0 right-0 h-1 flex", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 bg-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 bg-secondary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 bg-accent" })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md relative z-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border-2 border-primary/30 mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-8 h-8 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-display-medium text-foreground", children: "Ghana Votes 2024" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2 text-sm", children: "Secure Presidential Election Platform" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-center gap-1 mt-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-1 rounded-full bg-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-1 rounded-full bg-secondary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-1 rounded-full bg-accent" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "card-elevated shadow-lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-0 pt-6 px-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold text-foreground", children: "Sign In" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Enter your Ghana Card ID and password" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "px-6 py-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, noValidate: true, className: "space-y-5", children: [
            errors.general && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                "data-ocid": "login.error_state",
                className: "rounded-lg bg-primary/10 border border-primary/30 text-primary px-4 py-3 text-sm font-medium",
                role: "alert",
                children: errors.general
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ghanaCardId", className: "text-sm font-medium", children: "Ghana Card ID" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "ghanaCardId",
                    "data-ocid": "login.ghana_card_input",
                    type: "text",
                    placeholder: "GHA-XXXXXXXXX-X",
                    value: ghanaCardId,
                    onChange: (e) => setGhanaCardId(e.target.value),
                    onBlur: () => {
                      if (!ghanaCardId.trim()) {
                        setErrors((prev) => ({
                          ...prev,
                          ghanaCardId: "Ghana Card ID is required."
                        }));
                      } else {
                        setErrors((prev) => ({
                          ...prev,
                          ghanaCardId: void 0
                        }));
                      }
                    },
                    className: "pl-9 uppercase placeholder:normal-case",
                    autoComplete: "username",
                    "aria-describedby": errors.ghanaCardId ? "ghanaCardId-error" : void 0,
                    "aria-invalid": !!errors.ghanaCardId
                  }
                )
              ] }),
              errors.ghanaCardId && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  id: "ghanaCardId-error",
                  "data-ocid": "login.ghana_card_input.field_error",
                  className: "text-xs text-primary mt-1",
                  children: errors.ghanaCardId
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "password", className: "text-sm font-medium", children: "Password" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "password",
                    "data-ocid": "login.password_input",
                    type: showPassword ? "text" : "password",
                    placeholder: "Enter your password",
                    value: password,
                    onChange: (e) => setPassword(e.target.value),
                    onBlur: () => {
                      if (!password) {
                        setErrors((prev) => ({
                          ...prev,
                          password: "Password is required."
                        }));
                      } else {
                        setErrors((prev) => ({ ...prev, password: void 0 }));
                      }
                    },
                    className: "pl-9 pr-10",
                    autoComplete: "current-password",
                    "aria-describedby": errors.password ? "password-error" : void 0,
                    "aria-invalid": !!errors.password
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setShowPassword((v) => !v),
                    className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
                    "aria-label": showPassword ? "Hide password" : "Show password",
                    "data-ocid": "login.toggle_password",
                    children: showPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
                  }
                )
              ] }),
              errors.password && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  id: "password-error",
                  "data-ocid": "login.password_input.field_error",
                  className: "text-xs text-primary mt-1",
                  children: errors.password
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              GhanaButton,
              {
                type: "submit",
                ghanaVariant: "primary",
                className: "w-full h-11 text-base mt-2",
                disabled: isPending,
                "data-ocid": "login.submit_button",
                children: isPending ? "Signing in…" : "Sign In"
              }
            ),
            isPending && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                "data-ocid": "login.loading_state",
                className: "text-center text-xs text-muted-foreground",
                children: "Verifying credentials…"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 pt-5 border-t border-border text-center text-sm text-muted-foreground", children: [
            "Don't have an account? ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: "/register",
                "data-ocid": "login.register_link",
                className: "text-accent font-semibold hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                children: "Register to vote"
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-muted-foreground mt-6", children: "Electoral Commission of Ghana • Secure & Transparent Voting" })
    ] })
  ] });
}
export {
  LoginPage as default
};
