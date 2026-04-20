import { c as createLucideIcon, j as jsxRuntimeExports, d as cn, e as cva, a as useAuth, r as reactExports, V as Vote, G as GhanaButton, b as ue } from "./index-Bkav72OT.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-CxWdhJEb.js";
import { P as PageHeader, C as CircleAlert, S as Skeleton } from "./PageHeader-Dpi7hpVO.js";
import { c as useGetCandidates, d as useGetElectionStatus, e as useCastVote, E as ElectionStatus } from "./useQueries-C7TDwMkU.js";
import { B as Badge } from "./badge-ls4w498o.js";
import { C as Card, b as CardContent } from "./card-C3mNnfdI.js";
import { U as User } from "./user-DCrQr0VU.js";
import { L as Lock } from "./lock-BZ7G4CrT.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M7 10v12", key: "1qc93n" }],
  [
    "path",
    {
      d: "M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z",
      key: "emmmcr"
    }
  ]
];
const ThumbsUp = createLucideIcon("thumbs-up", __iconNode);
const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        destructive: "text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Alert({
  className,
  variant,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "alert",
      role: "alert",
      className: cn(alertVariants({ variant }), className),
      ...props
    }
  );
}
function AlertDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "alert-description",
      className: cn(
        "text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
        className
      ),
      ...props
    }
  );
}
function CandidateCard({
  candidate,
  selected = false,
  showVoteCount = false,
  onSelect,
  index = 0
}) {
  const photoUrl = candidate.photo.getDirectURL();
  const isClickable = !!onSelect;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Card,
    {
      className: cn(
        "transition-smooth overflow-hidden",
        isClickable && "cursor-pointer hover:shadow-card",
        selected && "ring-2 ring-primary ring-offset-2 shadow-card",
        !isClickable && "cursor-default"
      ),
      onClick: () => onSelect == null ? void 0 : onSelect(candidate),
      "data-ocid": `candidate.item.${index + 1}`,
      role: isClickable ? "button" : void 0,
      tabIndex: isClickable ? 0 : void 0,
      onKeyDown: isClickable ? (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect == null ? void 0 : onSelect(candidate);
        }
      } : void 0,
      "aria-pressed": isClickable ? selected : void 0,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[4/3] bg-muted overflow-hidden", children: [
          photoUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: photoUrl,
              alt: `${candidate.name} — ${candidate.party}`,
              className: "w-full h-full object-cover object-top",
              loading: "lazy"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-16 h-16 text-muted-foreground" }) }),
          selected && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "svg",
            {
              className: "w-5 h-5 text-primary-foreground",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
              strokeWidth: 3,
              "aria-hidden": "true",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  d: "M5 13l4 4L19 7"
                }
              )
            }
          ) }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h3",
            {
              className: "font-display font-bold text-foreground text-base leading-snug truncate",
              title: candidate.name,
              children: candidate.name
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "secondary",
              className: "mt-1.5 text-xs font-medium bg-secondary/20 text-secondary-foreground border-secondary/30 max-w-full truncate",
              title: candidate.party,
              children: candidate.party
            }
          ),
          showVoteCount && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 pt-3 border-t border-border flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Total Votes" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-primary text-lg", children: Number(candidate.voteCount).toLocaleString() })
          ] })
        ] })
      ]
    }
  );
}
function CandidatesSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6", children: Array.from({ length: 6 }, (_, i) => i).map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-lg overflow-hidden border border-border",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-[4/3] w-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-3/4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-1/2" })
        ] })
      ]
    },
    i
  )) });
}
function AlreadyVotedBanner({ candidate }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-xl border-2 p-6 flex flex-col sm:flex-row items-center gap-5 bg-card",
      style: { borderColor: "#FCD116" },
      "data-ocid": "vote.success_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-14 h-14 rounded-full flex items-center justify-center shrink-0",
            style: { backgroundColor: "#FCD116" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ThumbsUp, { className: "w-7 h-7", style: { color: "#006B3F" } })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center sm:text-left", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-lg text-foreground", children: "You have already voted. Thank you!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm mt-1", children: [
            "Your vote was cast for",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: candidate.name }),
            " ",
            "— ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: candidate.party })
          ] })
        ] })
      ]
    }
  );
}
function ElectionClosedBanner() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Alert,
    {
      className: "border-2 bg-muted/40",
      style: { borderColor: "#CE1126" },
      "data-ocid": "vote.closed_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-4 w-4", style: { color: "#CE1126" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDescription, { className: "font-semibold", style: { color: "#CE1126" }, children: "Election is currently closed. Voting is not available at this time." })
      ]
    }
  );
}
function ConfirmModal({
  candidate,
  open,
  isPending,
  onConfirm,
  onCancel
}) {
  if (!candidate) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (v) => !v && onCancel(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "max-w-sm",
      "data-ocid": "vote.dialog",
      onEscapeKeyDown: onCancel,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-xl text-center", children: "Confirm Your Vote" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1 justify-center my-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-8 h-1 rounded-full",
              style: { backgroundColor: "#CE1126" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-8 h-1 rounded-full",
              style: { backgroundColor: "#FCD116" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-8 h-1 rounded-full",
              style: { backgroundColor: "#006B3F" }
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3 py-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full overflow-hidden border-2 border-border bg-muted shrink-0", children: candidate.photo.getDirectURL() ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: candidate.photo.getDirectURL(),
              alt: candidate.name,
              className: "w-full h-full object-cover object-top"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Vote, { className: "w-8 h-8 text-muted-foreground" }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-foreground text-lg leading-snug", children: candidate.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-0.5", children: candidate.party })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-sm text-muted-foreground px-2", children: [
          "This action is ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "final" }),
          ". You can only vote once."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            GhanaButton,
            {
              ghanaVariant: "outline",
              className: "flex-1",
              onClick: onCancel,
              disabled: isPending,
              "data-ocid": "vote.cancel_button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            GhanaButton,
            {
              ghanaVariant: "accent",
              className: "flex-1",
              onClick: onConfirm,
              disabled: isPending,
              "data-ocid": "vote.confirm_button",
              children: isPending ? "Casting…" : "Cast Vote"
            }
          )
        ] })
      ]
    }
  ) });
}
const VOTED_KEY_PREFIX = "ghana_votes_voted_";
function getPersistedVote(ghanaCardId) {
  if (!ghanaCardId) return null;
  try {
    const raw = localStorage.getItem(VOTED_KEY_PREFIX + ghanaCardId);
    if (!raw) return null;
    return BigInt(raw);
  } catch {
    return null;
  }
}
function persistVote(ghanaCardId, candidateId) {
  if (!ghanaCardId) return;
  localStorage.setItem(VOTED_KEY_PREFIX + ghanaCardId, candidateId.toString());
}
function VotePage() {
  const { ghanaCardId } = useAuth();
  const {
    data: candidates = [],
    isLoading: candidatesLoading,
    isError: candidatesError
  } = useGetCandidates();
  const { data: electionStatus, isLoading: statusLoading } = useGetElectionStatus();
  const castVote = useCastVote();
  const [selected, setSelected] = reactExports.useState(null);
  const [modalOpen, setModalOpen] = reactExports.useState(false);
  const [votedCandidateId, setVotedCandidateId] = reactExports.useState(
    () => getPersistedVote(ghanaCardId)
  );
  const isElectionOpen = !electionStatus || electionStatus === ElectionStatus.open;
  const votedCandidate = votedCandidateId ? candidates.find((c) => c.id === votedCandidateId) ?? null : null;
  const hasVoted = votedCandidateId !== null;
  const { refetch: refetchStatus } = useGetElectionStatus();
  reactExports.useEffect(() => {
    const interval = setInterval(() => {
      refetchStatus();
    }, 1e4);
    return () => clearInterval(interval);
  }, [refetchStatus]);
  function handleSelectCandidate(candidate) {
    if (!isElectionOpen || hasVoted) return;
    setSelected(candidate);
  }
  function handleOpenModal() {
    if (!selected) return;
    setModalOpen(true);
  }
  function handleCancel() {
    setModalOpen(false);
  }
  async function handleConfirmVote() {
    if (!selected || !ghanaCardId) return;
    try {
      const result = await castVote.mutateAsync({
        ghanaCardId,
        candidateId: selected.id
      });
      if (result.__kind__ === "ok") {
        setVotedCandidateId(selected.id);
        persistVote(ghanaCardId, selected.id);
        setModalOpen(false);
        setSelected(null);
        ue.success("Your vote has been cast successfully!", {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "text-green-600 w-4 h-4" }),
          duration: 5e3
        });
      } else {
        setModalOpen(false);
        ue.error(
          result.err.message || "Failed to cast vote. Please try again."
        );
      }
    } catch {
      setModalOpen(false);
      ue.error("An unexpected error occurred. Please try again.");
    }
  }
  const isLoading = candidatesLoading || statusLoading;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", "data-ocid": "vote.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Cast Your Vote",
        subtitle: "Select your preferred presidential candidate for the 2024 Ghana Elections"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "container mx-auto px-4 py-8 max-w-5xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 mb-8", children: [
        !isLoading && !isElectionOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(ElectionClosedBanner, {}),
        hasVoted && votedCandidate && /* @__PURE__ */ jsxRuntimeExports.jsx(AlreadyVotedBanner, { candidate: votedCandidate }),
        candidatesError && /* @__PURE__ */ jsxRuntimeExports.jsxs(Alert, { variant: "destructive", "data-ocid": "vote.error_state", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDescription, { children: "Failed to load candidates. Please refresh the page." })
        ] })
      ] }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(CandidatesSkeleton, {}) : candidates.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center justify-center py-20 gap-4 text-center",
          "data-ocid": "vote.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Vote, { className: "w-8 h-8 text-muted-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-lg text-foreground", children: "No candidates available" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-xs", children: "Candidates have not been added yet. Check back later." })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6",
            "data-ocid": "vote.list",
            "aria-label": "Candidate list",
            children: candidates.map((candidate, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              CandidateCard,
              {
                candidate,
                selected: (selected == null ? void 0 : selected.id) === candidate.id,
                onSelect: !hasVoted && isElectionOpen ? handleSelectCandidate : void 0,
                index: idx
              },
              String(candidate.id)
            ))
          }
        ),
        isElectionOpen && !hasVoted && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-xl bg-card border border-border shadow-sm",
            "data-ocid": "vote.action_panel",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-0 text-center sm:text-left", children: selected ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Selected" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-foreground truncate", children: selected.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: selected.party })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Select a candidate above to continue" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                GhanaButton,
                {
                  ghanaVariant: "accent",
                  size: "lg",
                  disabled: !selected,
                  onClick: handleOpenModal,
                  "data-ocid": "vote.primary_button",
                  className: "w-full sm:w-auto",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Vote, { className: "w-4 h-4 mr-2" }),
                    "Vote Now"
                  ]
                }
              )
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ConfirmModal,
      {
        candidate: selected,
        open: modalOpen,
        isPending: castVote.isPending,
        onConfirm: handleConfirmVote,
        onCancel: handleCancel
      }
    )
  ] });
}
export {
  VotePage as default
};
