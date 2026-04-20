import { c as createLucideIcon, j as jsxRuntimeExports, d as cn } from "./index-Bkav72OT.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
const CircleAlert = createLucideIcon("circle-alert", __iconNode);
function Skeleton({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "skeleton",
      className: cn("bg-accent animate-pulse rounded-md", className),
      ...props
    }
  );
}
function PageHeader({
  title,
  subtitle,
  action,
  className,
  variant = "default"
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: cn(
        "py-8 md:py-10 border-b border-border",
        variant === "admin" ? "bg-accent text-accent-foreground" : "bg-card",
        className
      ),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-1 rounded-full bg-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-1 rounded-full bg-secondary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-1 rounded-full bg-accent" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h1",
              {
                className: cn(
                  "text-display-medium",
                  variant === "admin" ? "text-accent-foreground" : "text-foreground"
                ),
                children: title
              }
            ),
            subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: cn(
                  "mt-1 text-sm md:text-base",
                  variant === "admin" ? "text-accent-foreground/80" : "text-muted-foreground"
                ),
                children: subtitle
              }
            )
          ] }),
          action && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0", children: action })
        ] })
      ] })
    }
  );
}
export {
  CircleAlert as C,
  PageHeader as P,
  Skeleton as S
};
