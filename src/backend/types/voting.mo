import Storage "mo:caffeineai-object-storage/Storage";
import Common "common";

module {
  // ── Voter ────────────────────────────────────────────────────────────────
  /// Internal voter record — password hash stored, voter ID not linked to ballot
  public type Voter = {
    ghanaCardId : Common.VoterId; // unique Ghana Card ID used as key
    phone       : Text;
    passwordHash: Text;           // bcrypt-style hash
    var hasVoted: Bool;
    registeredAt: Common.Timestamp;
    var failedLoginAttempts: Nat;
    var lastFailedLoginAt  : Common.Timestamp;
  };

  /// Public-facing voter info (no password, no vote linkage)
  public type VoterInfo = {
    ghanaCardId : Common.VoterId;
    phone       : Text;
    registeredAt: Common.Timestamp;
    hasVoted    : Bool;
  };

  // ── Candidate ────────────────────────────────────────────────────────────
  public type Candidate = {
    id        : Common.CandidateId;
    var name  : Text;
    var party : Text;
    var photo : Storage.ExternalBlob; // managed via object-storage extension
    var voteCount: Nat;
  };

  /// Public-facing candidate (shared-type safe)
  public type CandidateInfo = {
    id       : Common.CandidateId;
    name     : Text;
    party    : Text;
    photo    : Storage.ExternalBlob;
    voteCount: Nat;
  };

  // ── Add / Update DTOs ────────────────────────────────────────────────────
  public type AddCandidatePayload = {
    name  : Text;
    party : Text;
    photo : Storage.ExternalBlob;
  };

  public type UpdateCandidatePayload = {
    id    : Common.CandidateId;
    name  : Text;
    party : Text;
    photo : Storage.ExternalBlob;
  };

  // ── Election ─────────────────────────────────────────────────────────────
  public type ElectionStatus = { #open; #closed };

  // ── Auth / Session ───────────────────────────────────────────────────────
  public type LoginResult = {
    #ok  : { token: Text };
    #err : { message: Text };
  };

  public type RegisterResult = {
    #ok;
    #err : { message: Text };
  };

  public type VoteResult = {
    #ok;
    #err : { message: Text };
  };

  // ── Results (admin) ──────────────────────────────────────────────────────
  public type ElectionResults = {
    candidates   : [CandidateInfo];
    totalVotes   : Nat;
    electionStatus: ElectionStatus;
  };
};
