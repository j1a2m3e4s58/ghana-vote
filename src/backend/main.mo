import Map     "mo:core/Map";
import Set     "mo:core/Set";
import AccessControl    "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import MixinObjectStorage  "mo:caffeineai-object-storage/Mixin";
import Common   "types/common";
import Types    "types/voting";
import VotingApi "mixins/voting-api";

actor {
  // ── Authorization extension ───────────────────────────────────────────
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // ── Object-storage extension ──────────────────────────────────────────
  include MixinObjectStorage();

  // ── Voting domain state ───────────────────────────────────────────────
  let voters     = Map.empty<Common.VoterId, Types.Voter>();
  let candidates = Map.empty<Common.CandidateId, Types.Candidate>();
  let ballots    = Set.empty<Common.VoterId>();     // anonymous vote tracking

  // ── Voting API mixin ──────────────────────────────────────────────────
  include VotingApi(
    accessControlState,
    voters,
    candidates,
    ballots,
  );
};
