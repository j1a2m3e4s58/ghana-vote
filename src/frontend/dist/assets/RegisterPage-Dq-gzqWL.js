import { c as createLucideIcon, u as useNavigate, r as reactExports, j as jsxRuntimeExports, G as GhanaButton, b as ue } from "./index-Bkav72OT.js";
import { C as Card, a as CardHeader, b as CardContent } from "./card-C3mNnfdI.js";
import { L as Label, I as Input } from "./label-RiMzNpXj.js";
import { b as useRegisterVoter } from "./useQueries-C7TDwMkU.js";
import { S as Shield, E as EyeOff, a as Eye } from "./shield-BZYz89LK.js";
import { U as User } from "./user-DCrQr0VU.js";
import { L as Lock } from "./lock-BZ7G4CrT.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
];
const CircleCheckBig = createLucideIcon("circle-check-big", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
      key: "9njp5v"
    }
  ]
];
const Phone = createLucideIcon("phone", __iconNode);
const GHANA_CARD_REGEX = /^GHA-[0-9]{9}$/;
const PHONE_REGEX = /^\+?[0-9]{9,15}$/;
function hashPassword(password) {
  return btoa(password);
}
function RegisterPage() {
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useRegisterVoter();
  const [ghanaCardId, setGhanaCardId] = reactExports.useState("");
  const [phone, setPhone] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [confirmPassword, setConfirmPassword] = reactExports.useState("");
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const [showConfirm, setShowConfirm] = reactExports.useState(false);
  const [errors, setErrors] = reactExports.useState({});
  const [success, setSuccess] = reactExports.useState(false);
  function validateField(name, value, other) {
    switch (name) {
      case "ghanaCardId":
        if (!value.trim()) return "Ghana Card ID is required.";
        if (!GHANA_CARD_REGEX.test(value.trim().toUpperCase()))
          return "Format must be GHA-XXXXXXXXX (e.g. GHA-123456789).";
        return void 0;
      case "phone":
        if (!value.trim()) return "Phone number is required.";
        if (!PHONE_REGEX.test(value.trim()))
          return "Enter a valid phone number.";
        return void 0;
      case "password":
        if (!value) return "Password is required.";
        if (value.length < 8) return "Password must be at least 8 characters.";
        return void 0;
      case "confirmPassword":
        if (!value) return "Please confirm your password.";
        if (value !== other) return "Passwords do not match.";
        return void 0;
    }
  }
  function validateAll() {
    const next = {
      ghanaCardId: validateField("ghanaCardId", ghanaCardId),
      phone: validateField("phone", phone),
      password: validateField("password", password),
      confirmPassword: validateField(
        "confirmPassword",
        confirmPassword,
        password
      )
    };
    const cleaned = Object.fromEntries(
      Object.entries(next).filter(([, v]) => v !== void 0)
    );
    setErrors(cleaned);
    return Object.keys(cleaned).length === 0;
  }
  function onBlur(name, value) {
    const err = validateField(
      name,
      value,
      name === "confirmPassword" ? password : void 0
    );
    setErrors((prev) => ({ ...prev, [name]: err }));
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (!validateAll()) return;
    setErrors({});
    try {
      const result = await mutateAsync({
        ghanaCardId: ghanaCardId.trim().toUpperCase(),
        phone: phone.trim(),
        passwordHash: hashPassword(password)
      });
      if (result.__kind__ === "ok") {
        setSuccess(true);
        ue.success("Registration successful! You can now sign in.");
        setTimeout(() => navigate({ to: "/login" }), 2500);
      } else {
        setErrors({
          general: result.err.message ?? "Registration failed. Please try again."
        });
      }
    } catch {
      setErrors({ general: "Something went wrong. Please try again." });
    }
  }
  if (success) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[calc(100vh-4rem)] bg-background flex items-center justify-center px-4 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "register.success_state",
        className: "text-center max-w-sm",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 border-2 border-accent/30 mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-8 h-8 text-accent" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-display-medium text-foreground mb-2", children: "Registration Successful!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-6", children: "Your voter account has been created. Redirecting to sign in…" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-1 rounded-full bg-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-1 rounded-full bg-secondary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-1 rounded-full bg-accent" })
          ] })
        ]
      }
    ) });
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
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 border-2 border-accent/30 mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-8 h-8 text-accent" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-display-medium text-foreground", children: "Ghana Votes 2024" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2 text-sm", children: "Register as a Verified Voter" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-center gap-1 mt-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-1 rounded-full bg-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-1 rounded-full bg-secondary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-1 rounded-full bg-accent" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "card-elevated shadow-lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-0 pt-6 px-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold text-foreground", children: "Create Voter Account" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Use your official Ghana Card details to register" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "px-6 py-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, noValidate: true, className: "space-y-5", children: [
            errors.general && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                "data-ocid": "register.error_state",
                className: "rounded-lg bg-primary/10 border border-primary/30 text-primary px-4 py-3 text-sm font-medium",
                role: "alert",
                children: errors.general
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Label,
                {
                  htmlFor: "reg-ghanaCardId",
                  className: "text-sm font-medium",
                  children: "Ghana Card ID"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "reg-ghanaCardId",
                    "data-ocid": "register.ghana_card_input",
                    type: "text",
                    placeholder: "GHA-123456789",
                    value: ghanaCardId,
                    onChange: (e) => setGhanaCardId(e.target.value),
                    onBlur: () => onBlur("ghanaCardId", ghanaCardId),
                    className: "pl-9 uppercase placeholder:normal-case",
                    autoComplete: "username",
                    "aria-describedby": errors.ghanaCardId ? "reg-ghanaCardId-error" : void 0,
                    "aria-invalid": !!errors.ghanaCardId
                  }
                )
              ] }),
              errors.ghanaCardId && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  id: "reg-ghanaCardId-error",
                  "data-ocid": "register.ghana_card_input.field_error",
                  className: "text-xs text-primary mt-1",
                  children: errors.ghanaCardId
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "reg-phone", className: "text-sm font-medium", children: "Phone Number" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "reg-phone",
                    "data-ocid": "register.phone_input",
                    type: "tel",
                    placeholder: "+233 XX XXX XXXX",
                    value: phone,
                    onChange: (e) => setPhone(e.target.value),
                    onBlur: () => onBlur("phone", phone),
                    className: "pl-9",
                    autoComplete: "tel",
                    "aria-describedby": errors.phone ? "reg-phone-error" : void 0,
                    "aria-invalid": !!errors.phone
                  }
                )
              ] }),
              errors.phone && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  id: "reg-phone-error",
                  "data-ocid": "register.phone_input.field_error",
                  className: "text-xs text-primary mt-1",
                  children: errors.phone
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "reg-password", className: "text-sm font-medium", children: "Password" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "reg-password",
                    "data-ocid": "register.password_input",
                    type: showPassword ? "text" : "password",
                    placeholder: "Minimum 8 characters",
                    value: password,
                    onChange: (e) => setPassword(e.target.value),
                    onBlur: () => onBlur("password", password),
                    className: "pl-9 pr-10",
                    autoComplete: "new-password",
                    "aria-describedby": errors.password ? "reg-password-error" : void 0,
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
                    "data-ocid": "register.toggle_password",
                    children: showPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
                  }
                )
              ] }),
              errors.password && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  id: "reg-password-error",
                  "data-ocid": "register.password_input.field_error",
                  className: "text-xs text-primary mt-1",
                  children: errors.password
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "reg-confirm", className: "text-sm font-medium", children: "Confirm Password" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "reg-confirm",
                    "data-ocid": "register.confirm_password_input",
                    type: showConfirm ? "text" : "password",
                    placeholder: "Re-enter your password",
                    value: confirmPassword,
                    onChange: (e) => setConfirmPassword(e.target.value),
                    onBlur: () => onBlur("confirmPassword", confirmPassword),
                    className: "pl-9 pr-10",
                    autoComplete: "new-password",
                    "aria-describedby": errors.confirmPassword ? "reg-confirm-error" : void 0,
                    "aria-invalid": !!errors.confirmPassword
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setShowConfirm((v) => !v),
                    className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
                    "aria-label": showConfirm ? "Hide confirm password" : "Show confirm password",
                    "data-ocid": "register.toggle_confirm_password",
                    children: showConfirm ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
                  }
                )
              ] }),
              errors.confirmPassword && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  id: "reg-confirm-error",
                  "data-ocid": "register.confirm_password_input.field_error",
                  className: "text-xs text-primary mt-1",
                  children: errors.confirmPassword
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              GhanaButton,
              {
                type: "submit",
                ghanaVariant: "accent",
                className: "w-full h-11 text-base mt-2",
                disabled: isPending,
                "data-ocid": "register.submit_button",
                children: isPending ? "Creating Account…" : "Register to Vote"
              }
            ),
            isPending && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                "data-ocid": "register.loading_state",
                className: "text-center text-xs text-muted-foreground",
                children: "Registering your voter account…"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 pt-5 border-t border-border text-center text-sm text-muted-foreground", children: [
            "Already registered? ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: "/login",
                "data-ocid": "register.login_link",
                className: "text-primary font-semibold hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                children: "Sign in here"
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
  RegisterPage as default
};
