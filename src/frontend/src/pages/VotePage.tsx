import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, CheckCircle2, Lock, ThumbsUp, Vote } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ElectionStatus } from "../backend";
import CandidateCard from "../components/CandidateCard";
import GhanaButton from "../components/GhanaButton";
import PageHeader from "../components/PageHeader";
import { useAuth } from "../hooks/useAuth";
import {
  useCastVote,
  useGetCandidates,
  useGetElectionStatus,
} from "../hooks/useQueries";
import type { CandidateInfo } from "../types";

// ─── Skeleton grid shown while candidates load ────────────────────────────────
function CandidatesSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
      {Array.from({ length: 6 }, (_, i) => i).map((i) => (
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: static list, no reorder
          key={i}
          className="rounded-lg overflow-hidden border border-border"
        >
          <Skeleton className="aspect-[4/3] w-full" />
          <div className="p-4 space-y-2">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Already voted banner ─────────────────────────────────────────────────────
function AlreadyVotedBanner({ candidate }: { candidate: CandidateInfo }) {
  return (
    <div
      className="rounded-xl border-2 p-6 flex flex-col sm:flex-row items-center gap-5 bg-card"
      style={{ borderColor: "#FCD116" }}
      data-ocid="vote.success_state"
    >
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center shrink-0"
        style={{ backgroundColor: "#FCD116" }}
      >
        <ThumbsUp className="w-7 h-7" style={{ color: "#006B3F" }} />
      </div>
      <div className="text-center sm:text-left">
        <p className="font-display font-bold text-lg text-foreground">
          You have already voted. Thank you!
        </p>
        <p className="text-muted-foreground text-sm mt-1">
          Your vote was cast for{" "}
          <span className="font-semibold text-foreground">
            {candidate.name}
          </span>{" "}
          — <span className="text-muted-foreground">{candidate.party}</span>
        </p>
      </div>
    </div>
  );
}

// ─── Election closed banner ───────────────────────────────────────────────────
function ElectionClosedBanner() {
  return (
    <Alert
      className="border-2 bg-muted/40"
      style={{ borderColor: "#CE1126" }}
      data-ocid="vote.closed_state"
    >
      <Lock className="h-4 w-4" style={{ color: "#CE1126" }} />
      <AlertDescription className="font-semibold" style={{ color: "#CE1126" }}>
        Election is currently closed. Voting is not available at this time.
      </AlertDescription>
    </Alert>
  );
}

// ─── Confirmation modal ───────────────────────────────────────────────────────
interface ConfirmModalProps {
  candidate: CandidateInfo | null;
  open: boolean;
  isPending: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

function ConfirmModal({
  candidate,
  open,
  isPending,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!candidate) return null;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onCancel()}>
      <DialogContent
        className="max-w-sm"
        data-ocid="vote.dialog"
        onEscapeKeyDown={onCancel}
      >
        <DialogHeader>
          <DialogTitle className="font-display text-xl text-center">
            Confirm Your Vote
          </DialogTitle>
        </DialogHeader>

        {/* Ghana flag stripe */}
        <div className="flex gap-1 justify-center my-1">
          <div
            className="w-8 h-1 rounded-full"
            style={{ backgroundColor: "#CE1126" }}
          />
          <div
            className="w-8 h-1 rounded-full"
            style={{ backgroundColor: "#FCD116" }}
          />
          <div
            className="w-8 h-1 rounded-full"
            style={{ backgroundColor: "#006B3F" }}
          />
        </div>

        <div className="flex flex-col items-center gap-3 py-2">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-border bg-muted shrink-0">
            {candidate.photo.getDirectURL() ? (
              <img
                src={candidate.photo.getDirectURL()}
                alt={candidate.name}
                className="w-full h-full object-cover object-top"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-muted">
                <Vote className="w-8 h-8 text-muted-foreground" />
              </div>
            )}
          </div>
          <div className="text-center">
            <p className="font-display font-bold text-foreground text-lg leading-snug">
              {candidate.name}
            </p>
            <p className="text-muted-foreground text-sm mt-0.5">
              {candidate.party}
            </p>
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground px-2">
          This action is <strong>final</strong>. You can only vote once.
        </p>

        <div className="flex gap-3 pt-1">
          <GhanaButton
            ghanaVariant="outline"
            className="flex-1"
            onClick={onCancel}
            disabled={isPending}
            data-ocid="vote.cancel_button"
          >
            Cancel
          </GhanaButton>
          <GhanaButton
            ghanaVariant="accent"
            className="flex-1"
            onClick={onConfirm}
            disabled={isPending}
            data-ocid="vote.confirm_button"
          >
            {isPending ? "Casting…" : "Cast Vote"}
          </GhanaButton>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
const VOTED_KEY_PREFIX = "ghana_votes_voted_";

function getPersistedVote(ghanaCardId: string | null): bigint | null {
  if (!ghanaCardId) return null;
  try {
    const raw = localStorage.getItem(VOTED_KEY_PREFIX + ghanaCardId);
    if (!raw) return null;
    return BigInt(raw);
  } catch {
    return null;
  }
}

function persistVote(ghanaCardId: string | null, candidateId: bigint): void {
  if (!ghanaCardId) return;
  localStorage.setItem(VOTED_KEY_PREFIX + ghanaCardId, candidateId.toString());
}

export default function VotePage() {
  const { ghanaCardId } = useAuth();

  const {
    data: candidates = [],
    isLoading: candidatesLoading,
    isError: candidatesError,
  } = useGetCandidates();

  const { data: electionStatus, isLoading: statusLoading } =
    useGetElectionStatus();

  const castVote = useCastVote();

  const [selected, setSelected] = useState<CandidateInfo | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  // Initialize voted state from localStorage so it survives page refresh
  const [votedCandidateId, setVotedCandidateId] = useState<bigint | null>(() =>
    getPersistedVote(ghanaCardId),
  );

  const isElectionOpen =
    !electionStatus || electionStatus === ElectionStatus.open;

  const votedCandidate = votedCandidateId
    ? (candidates.find((c) => c.id === votedCandidateId) ?? null)
    : null;

  const hasVoted = votedCandidateId !== null;

  // Poll election status every 10 seconds
  const { refetch: refetchStatus } = useGetElectionStatus();
  useEffect(() => {
    const interval = setInterval(() => {
      refetchStatus();
    }, 10_000);
    return () => clearInterval(interval);
  }, [refetchStatus]);

  function handleSelectCandidate(candidate: CandidateInfo) {
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
        candidateId: selected.id,
      });

      if (result.__kind__ === "ok") {
        setVotedCandidateId(selected.id);
        persistVote(ghanaCardId, selected.id);
        setModalOpen(false);
        setSelected(null);
        toast.success("Your vote has been cast successfully!", {
          icon: <CheckCircle2 className="text-green-600 w-4 h-4" />,
          duration: 5000,
        });
      } else {
        setModalOpen(false);
        toast.error(
          result.err.message || "Failed to cast vote. Please try again.",
        );
      }
    } catch {
      setModalOpen(false);
      toast.error("An unexpected error occurred. Please try again.");
    }
  }

  const isLoading = candidatesLoading || statusLoading;

  return (
    <div className="min-h-screen bg-background" data-ocid="vote.page">
      <PageHeader
        title="Cast Your Vote"
        subtitle="Select your preferred presidential candidate for the 2024 Ghana Elections"
      />

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Status banners */}
        <div className="space-y-4 mb-8">
          {!isLoading && !isElectionOpen && <ElectionClosedBanner />}
          {hasVoted && votedCandidate && (
            <AlreadyVotedBanner candidate={votedCandidate} />
          )}
          {candidatesError && (
            <Alert variant="destructive" data-ocid="vote.error_state">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Failed to load candidates. Please refresh the page.
              </AlertDescription>
            </Alert>
          )}
        </div>

        {/* Candidate grid */}
        {isLoading ? (
          <CandidatesSkeleton />
        ) : candidates.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-20 gap-4 text-center"
            data-ocid="vote.empty_state"
          >
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
              <Vote className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="font-display font-semibold text-lg text-foreground">
              No candidates available
            </p>
            <p className="text-muted-foreground text-sm max-w-xs">
              Candidates have not been added yet. Check back later.
            </p>
          </div>
        ) : (
          <>
            <div
              className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
              data-ocid="vote.list"
              aria-label="Candidate list"
            >
              {candidates.map((candidate, idx) => (
                <CandidateCard
                  key={String(candidate.id)}
                  candidate={candidate}
                  selected={selected?.id === candidate.id}
                  onSelect={
                    !hasVoted && isElectionOpen
                      ? handleSelectCandidate
                      : undefined
                  }
                  index={idx}
                />
              ))}
            </div>

            {/* Action bar — only show if election is open and user hasn't voted */}
            {isElectionOpen && !hasVoted && (
              <div
                className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-xl bg-card border border-border shadow-sm"
                data-ocid="vote.action_panel"
              >
                <div className="min-w-0 text-center sm:text-left">
                  {selected ? (
                    <>
                      <p className="text-sm text-muted-foreground">Selected</p>
                      <p className="font-display font-bold text-foreground truncate">
                        {selected.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {selected.party}
                      </p>
                    </>
                  ) : (
                    <p className="text-muted-foreground text-sm">
                      Select a candidate above to continue
                    </p>
                  )}
                </div>
                <GhanaButton
                  ghanaVariant="accent"
                  size="lg"
                  disabled={!selected}
                  onClick={handleOpenModal}
                  data-ocid="vote.primary_button"
                  className="w-full sm:w-auto"
                >
                  <Vote className="w-4 h-4 mr-2" />
                  Vote Now
                </GhanaButton>
              </div>
            )}
          </>
        )}
      </main>

      <ConfirmModal
        candidate={selected}
        open={modalOpen}
        isPending={castVote.isPending}
        onConfirm={handleConfirmVote}
        onCancel={handleCancel}
      />
    </div>
  );
}
