import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";
import type { CandidateInfo } from "../types";

interface CandidateCardProps {
  candidate: CandidateInfo;
  selected?: boolean;
  showVoteCount?: boolean;
  onSelect?: (candidate: CandidateInfo) => void;
  index?: number;
}

export default function CandidateCard({
  candidate,
  selected = false,
  showVoteCount = false,
  onSelect,
  index = 0,
}: CandidateCardProps) {
  const photoUrl = candidate.photo.getDirectURL();
  const isClickable = !!onSelect;

  return (
    <Card
      className={cn(
        "transition-smooth overflow-hidden",
        isClickable && "cursor-pointer hover:shadow-card",
        selected && "ring-2 ring-primary ring-offset-2 shadow-card",
        !isClickable && "cursor-default",
      )}
      onClick={() => onSelect?.(candidate)}
      data-ocid={`candidate.item.${index + 1}`}
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={
        isClickable
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect?.(candidate);
              }
            }
          : undefined
      }
      aria-pressed={isClickable ? selected : undefined}
    >
      {/* Photo */}
      <div className="relative aspect-[4/3] bg-muted overflow-hidden">
        {photoUrl ? (
          <img
            src={photoUrl}
            alt={`${candidate.name} — ${candidate.party}`}
            className="w-full h-full object-cover object-top"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted">
            <User className="w-16 h-16 text-muted-foreground" />
          </div>
        )}
        {selected && (
          <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg">
              <svg
                className="w-5 h-5 text-primary-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <h3
          className="font-display font-bold text-foreground text-base leading-snug truncate"
          title={candidate.name}
        >
          {candidate.name}
        </h3>
        <Badge
          variant="secondary"
          className="mt-1.5 text-xs font-medium bg-secondary/20 text-secondary-foreground border-secondary/30 max-w-full truncate"
          title={candidate.party}
        >
          {candidate.party}
        </Badge>

        {showVoteCount && (
          <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Total Votes</span>
            <span className="font-display font-bold text-primary text-lg">
              {Number(candidate.voteCount).toLocaleString()}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
