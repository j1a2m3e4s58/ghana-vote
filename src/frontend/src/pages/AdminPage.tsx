import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import { AlertCircle, BarChart3, Users, Vote } from "lucide-react";
import { ElectionStatus } from "../backend";
import GhanaButton from "../components/GhanaButton";
import PageHeader from "../components/PageHeader";
import { useGetResults, useSetElectionStatus } from "../hooks/useQueries";

function StatCard({
  title,
  value,
  icon: Icon,
  accent,
}: {
  title: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  accent?: "primary" | "secondary" | "accent";
}) {
  const accentClass = {
    primary: "bg-primary/10 text-primary",
    secondary: "bg-secondary/20 text-secondary-foreground",
    accent: "bg-accent/10 text-accent",
  }[accent ?? "primary"];

  return (
    <Card className="card-elevated">
      <CardContent className="p-5 flex items-center gap-4">
        <div className={`rounded-xl p-3 ${accentClass}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="min-w-0">
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <p className="text-2xl font-display font-bold text-foreground leading-none mt-0.5">
            {value}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function CandidateResultRow({
  name,
  party,
  photoUrl,
  votes,
  percentage,
  rank,
}: {
  name: string;
  party: string;
  photoUrl: string;
  votes: number;
  percentage: number;
  rank: number;
}) {
  return (
    <div
      className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:shadow-sm transition-smooth"
      data-ocid={`admin.result.item.${rank}`}
    >
      <span className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground flex-shrink-0">
        {rank}
      </span>
      <div className="w-10 h-10 rounded-full overflow-hidden bg-muted flex-shrink-0 border border-border">
        {photoUrl ? (
          <img
            src={photoUrl}
            alt={name}
            className="w-full h-full object-cover object-top"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Users className="w-5 h-5 text-muted-foreground" />
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-foreground truncate">{name}</span>
          <Badge
            variant="secondary"
            className="text-xs bg-secondary/20 text-secondary-foreground border-secondary/30 flex-shrink-0"
          >
            {party}
          </Badge>
        </div>
        <div className="mt-2 flex items-center gap-3">
          <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all duration-700"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <span className="text-sm font-display font-bold text-foreground w-14 text-right flex-shrink-0">
            {votes.toLocaleString()}
          </span>
          <span className="text-xs text-muted-foreground w-12 text-right flex-shrink-0">
            {percentage.toFixed(1)}%
          </span>
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const { data: results, isLoading, isError } = useGetResults();
  const setStatus = useSetElectionStatus();

  const isOpen = results?.electionStatus === ElectionStatus.open;
  const totalVotes = Number(results?.totalVotes ?? 0);
  const candidateCount = results?.candidates.length ?? 0;

  const handleToggleStatus = () => {
    const next = isOpen ? ElectionStatus.closed : ElectionStatus.open;
    setStatus.mutate(next);
  };

  const sortedCandidates = [...(results?.candidates ?? [])].sort(
    (a, b) => Number(b.voteCount) - Number(a.voteCount),
  );

  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        variant="admin"
        title="Election Dashboard"
        subtitle="Live results — auto-refreshes every 5 seconds"
        action={
          <div className="flex items-center gap-3">
            <Link to="/admin/candidates" data-ocid="admin.candidates_link">
              <GhanaButton ghanaVariant="outline" size="sm">
                <Users className="w-4 h-4 mr-2" />
                Manage Candidates
              </GhanaButton>
            </Link>
            <GhanaButton
              ghanaVariant={isOpen ? "primary" : "accent"}
              size="sm"
              onClick={handleToggleStatus}
              disabled={setStatus.isPending || isLoading}
              data-ocid="admin.election_toggle"
            >
              {setStatus.isPending ? (
                "Updating…"
              ) : isOpen ? (
                <>
                  <span className="inline-block w-2 h-2 rounded-full bg-primary-foreground mr-2 animate-pulse" />
                  Stop Election
                </>
              ) : (
                <>
                  <Vote className="w-4 h-4 mr-2" />
                  Start Election
                </>
              )}
            </GhanaButton>
          </div>
        }
      />

      <div className="container mx-auto px-4 py-8 max-w-4xl space-y-8">
        {/* Election status banner */}
        <div
          className={`rounded-xl px-5 py-3 flex items-center gap-3 border transition-smooth ${
            isOpen
              ? "bg-accent/10 border-accent/30 text-accent"
              : "bg-muted border-border text-muted-foreground"
          }`}
          data-ocid="admin.status_banner"
        >
          <span
            className={`inline-block w-2.5 h-2.5 rounded-full flex-shrink-0 ${
              isOpen ? "bg-accent animate-pulse" : "bg-muted-foreground"
            }`}
          />
          <span className="font-semibold text-sm">
            {isLoading
              ? "Loading election status…"
              : isOpen
                ? "Election is OPEN — Voting is live"
                : "Election is CLOSED — Voting is not active"}
          </span>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {isLoading ? (
            <>
              <Skeleton className="h-20 rounded-xl" />
              <Skeleton className="h-20 rounded-xl" />
              <Skeleton className="h-20 rounded-xl" />
            </>
          ) : (
            <>
              <StatCard
                title="Total Votes Cast"
                value={totalVotes.toLocaleString()}
                icon={Vote}
                accent="primary"
              />
              <StatCard
                title="Candidates"
                value={candidateCount}
                icon={Users}
                accent="secondary"
              />
              <StatCard
                title="Turnout Tracker"
                icon={BarChart3}
                value={isOpen ? "Live" : "Final"}
                accent="accent"
              />
            </>
          )}
        </div>

        {/* Results table */}
        <Card className="card-elevated" data-ocid="admin.results_section">
          <CardHeader className="pb-3 border-b border-border">
            <CardTitle className="font-display text-lg flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              Results Breakdown
              {!isLoading && (
                <Badge
                  variant="secondary"
                  className="ml-auto text-xs bg-secondary/20"
                >
                  {candidateCount} candidates
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            {isLoading ? (
              <div
                className="space-y-3"
                data-ocid="admin.results.loading_state"
              >
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-16 rounded-xl" />
                ))}
              </div>
            ) : isError ? (
              <div
                className="flex flex-col items-center gap-3 py-10 text-muted-foreground"
                data-ocid="admin.results.error_state"
              >
                <AlertCircle className="w-10 h-10 text-primary/60" />
                <p className="text-sm font-medium">Failed to load results</p>
              </div>
            ) : sortedCandidates.length === 0 ? (
              <div
                className="flex flex-col items-center gap-3 py-10 text-muted-foreground"
                data-ocid="admin.results.empty_state"
              >
                <Users className="w-10 h-10 text-muted-foreground/50" />
                <p className="text-sm font-medium">No candidates yet</p>
                <Link to="/admin/candidates">
                  <GhanaButton ghanaVariant="accent" size="sm">
                    Add Candidates
                  </GhanaButton>
                </Link>
              </div>
            ) : (
              sortedCandidates.map((c, i) => {
                const votes = Number(c.voteCount);
                const pct = totalVotes > 0 ? (votes / totalVotes) * 100 : 0;
                return (
                  <CandidateResultRow
                    key={String(c.id)}
                    name={c.name}
                    party={c.party}
                    photoUrl={c.photo.getDirectURL()}
                    votes={votes}
                    percentage={pct}
                    rank={i + 1}
                  />
                );
              })
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
