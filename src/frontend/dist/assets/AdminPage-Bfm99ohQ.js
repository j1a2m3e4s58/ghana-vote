import { c as createLucideIcon, j as jsxRuntimeExports, L as Link, G as GhanaButton, U as Users, V as Vote } from "./index-Bkav72OT.js";
import { B as Badge } from "./badge-ls4w498o.js";
import { C as Card, a as CardHeader, c as CardTitle, b as CardContent } from "./card-C3mNnfdI.js";
import { P as PageHeader, S as Skeleton, C as CircleAlert } from "./PageHeader-Dpi7hpVO.js";
import { f as useGetResults, g as useSetElectionStatus, E as ElectionStatus } from "./useQueries-C7TDwMkU.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16", key: "c24i48" }],
  ["path", { d: "M18 17V9", key: "2bz60n" }],
  ["path", { d: "M13 17V5", key: "1frdt8" }],
  ["path", { d: "M8 17v-3", key: "17ska0" }]
];
const ChartColumn = createLucideIcon("chart-column", __iconNode);
function StatCard({
  title,
  value,
  icon: Icon,
  accent
}) {
  const accentClass = {
    primary: "bg-primary/10 text-primary",
    secondary: "bg-secondary/20 text-secondary-foreground",
    accent: "bg-accent/10 text-accent"
  }[accent ?? "primary"];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "card-elevated", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 flex items-center gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `rounded-xl p-3 ${accentClass}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-6 h-6" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-medium", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-display font-bold text-foreground leading-none mt-0.5", children: value })
    ] })
  ] }) });
}
function CandidateResultRow({
  name,
  party,
  photoUrl,
  votes,
  percentage,
  rank
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:shadow-sm transition-smooth",
      "data-ocid": `admin.result.item.${rank}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-7 h-7 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground flex-shrink-0", children: rank }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full overflow-hidden bg-muted flex-shrink-0 border border-border", children: photoUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: photoUrl,
            alt: name,
            className: "w-full h-full object-cover object-top"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-5 h-5 text-muted-foreground" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground truncate", children: name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "secondary",
                className: "text-xs bg-secondary/20 text-secondary-foreground border-secondary/30 flex-shrink-0",
                children: party
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-2 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "h-full rounded-full bg-primary transition-all duration-700",
                style: { width: `${percentage}%` }
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-display font-bold text-foreground w-14 text-right flex-shrink-0", children: votes.toLocaleString() }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground w-12 text-right flex-shrink-0", children: [
              percentage.toFixed(1),
              "%"
            ] })
          ] })
        ] })
      ]
    }
  );
}
function AdminPage() {
  const { data: results, isLoading, isError } = useGetResults();
  const setStatus = useSetElectionStatus();
  const isOpen = (results == null ? void 0 : results.electionStatus) === ElectionStatus.open;
  const totalVotes = Number((results == null ? void 0 : results.totalVotes) ?? 0);
  const candidateCount = (results == null ? void 0 : results.candidates.length) ?? 0;
  const handleToggleStatus = () => {
    const next = isOpen ? ElectionStatus.closed : ElectionStatus.open;
    setStatus.mutate(next);
  };
  const sortedCandidates = [...(results == null ? void 0 : results.candidates) ?? []].sort(
    (a, b) => Number(b.voteCount) - Number(a.voteCount)
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        variant: "admin",
        title: "Election Dashboard",
        subtitle: "Live results — auto-refreshes every 5 seconds",
        action: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/candidates", "data-ocid": "admin.candidates_link", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GhanaButton, { ghanaVariant: "outline", size: "sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4 mr-2" }),
            "Manage Candidates"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            GhanaButton,
            {
              ghanaVariant: isOpen ? "primary" : "accent",
              size: "sm",
              onClick: handleToggleStatus,
              disabled: setStatus.isPending || isLoading,
              "data-ocid": "admin.election_toggle",
              children: setStatus.isPending ? "Updating…" : isOpen ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block w-2 h-2 rounded-full bg-primary-foreground mr-2 animate-pulse" }),
                "Stop Election"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Vote, { className: "w-4 h-4 mr-2" }),
                "Start Election"
              ] })
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-8 max-w-4xl space-y-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `rounded-xl px-5 py-3 flex items-center gap-3 border transition-smooth ${isOpen ? "bg-accent/10 border-accent/30 text-accent" : "bg-muted border-border text-muted-foreground"}`,
          "data-ocid": "admin.status_banner",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `inline-block w-2.5 h-2.5 rounded-full flex-shrink-0 ${isOpen ? "bg-accent animate-pulse" : "bg-muted-foreground"}`
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-sm", children: isLoading ? "Loading election status…" : isOpen ? "Election is OPEN — Voting is live" : "Election is CLOSED — Voting is not active" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 rounded-xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 rounded-xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 rounded-xl" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            title: "Total Votes Cast",
            value: totalVotes.toLocaleString(),
            icon: Vote,
            accent: "primary"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            title: "Candidates",
            value: candidateCount,
            icon: Users,
            accent: "secondary"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            title: "Turnout Tracker",
            icon: ChartColumn,
            value: isOpen ? "Live" : "Final",
            accent: "accent"
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "card-elevated", "data-ocid": "admin.results_section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "font-display text-lg flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "w-5 h-5 text-primary" }),
          "Results Breakdown",
          !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Badge,
            {
              variant: "secondary",
              className: "ml-auto text-xs bg-secondary/20",
              children: [
                candidateCount,
                " candidates"
              ]
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4 space-y-3", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "space-y-3",
            "data-ocid": "admin.results.loading_state",
            children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 rounded-xl" }, i))
          }
        ) : isError ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center gap-3 py-10 text-muted-foreground",
            "data-ocid": "admin.results.error_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-10 h-10 text-primary/60" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "Failed to load results" })
            ]
          }
        ) : sortedCandidates.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center gap-3 py-10 text-muted-foreground",
            "data-ocid": "admin.results.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-10 h-10 text-muted-foreground/50" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "No candidates yet" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/candidates", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GhanaButton, { ghanaVariant: "accent", size: "sm", children: "Add Candidates" }) })
            ]
          }
        ) : sortedCandidates.map((c, i) => {
          const votes = Number(c.voteCount);
          const pct = totalVotes > 0 ? votes / totalVotes * 100 : 0;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            CandidateResultRow,
            {
              name: c.name,
              party: c.party,
              photoUrl: c.photo.getDirectURL(),
              votes,
              percentage: pct,
              rank: i + 1
            },
            String(c.id)
          );
        }) })
      ] })
    ] })
  ] });
}
export {
  AdminPage as default
};
