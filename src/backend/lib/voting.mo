import Map     "mo:core/Map";
import Set     "mo:core/Set";
import Iter    "mo:core/Iter";
import Common  "../types/common";
import Types   "../types/voting";

module {
  // ── Voter helpers ────────────────────────────────────────────────────────

  /// Validate Ghana Card ID format: starts with "GHA-" followed by 9 digits
  func isValidGhanaCardId(id : Text) : Bool {
    if (id.size() != 13) return false;
    let chars = id.toArray();
    chars[0] == 'G' and chars[1] == 'H' and chars[2] == 'A' and chars[3] == '-'
    and chars[4] >= '0' and chars[4] <= '9'
    and chars[5] >= '0' and chars[5] <= '9'
    and chars[6] >= '0' and chars[6] <= '9'
    and chars[7] >= '0' and chars[7] <= '9'
    and chars[8] >= '0' and chars[8] <= '9'
    and chars[9] >= '0' and chars[9] <= '9'
    and chars[10] >= '0' and chars[10] <= '9'
    and chars[11] >= '0' and chars[11] <= '9'
    and chars[12] >= '0' and chars[12] <= '9'
  };

  /// Register a new voter; returns error text on duplicate or invalid input
  public func registerVoter(
    voters       : Map.Map<Common.VoterId, Types.Voter>,
    ghanaCardId  : Common.VoterId,
    phone        : Text,
    passwordHash : Text,
    now          : Common.Timestamp,
  ) : Types.RegisterResult {
    if (ghanaCardId.size() == 0) {
      return #err { message = "Ghana Card ID is required" };
    };
    if (not isValidGhanaCardId(ghanaCardId)) {
      return #err { message = "Invalid Ghana Card ID format. Expected format: GHA-123456789" };
    };
    if (phone.size() == 0) {
      return #err { message = "Phone number is required" };
    };
    if (passwordHash.size() == 0) {
      return #err { message = "Password is required" };
    };
    switch (voters.get(ghanaCardId)) {
      case (?_) { #err { message = "A voter with this Ghana Card ID is already registered" } };
      case null {
        let voter : Types.Voter = {
          ghanaCardId;
          phone;
          passwordHash;
          var hasVoted = false;
          registeredAt = now;
          var failedLoginAttempts = 0;
          var lastFailedLoginAt = 0;
        };
        voters.add(ghanaCardId, voter);
        #ok
      };
    };
  };

  /// Verify voter credentials; updates failed-attempt tracking
  public func loginVoter(
    voters       : Map.Map<Common.VoterId, Types.Voter>,
    ghanaCardId  : Common.VoterId,
    passwordHash : Text,
    now          : Common.Timestamp,
  ) : Types.LoginResult {
    if (ghanaCardId.size() == 0 or passwordHash.size() == 0) {
      return #err { message = "Ghana Card ID and password are required" };
    };
    switch (voters.get(ghanaCardId)) {
      case null { #err { message = "Invalid credentials" } };
      case (?voter) {
        // Rate limiting: block after 5 failed attempts within 15 minutes
        let fifteenMinutes : Int = 900_000_000_000; // 15 min in nanoseconds
        if (voter.failedLoginAttempts >= 5 and (now - voter.lastFailedLoginAt) < fifteenMinutes) {
          return #err { message = "Too many failed attempts. Please try again later." };
        };
        if (voter.passwordHash != passwordHash) {
          voter.failedLoginAttempts += 1;
          voter.lastFailedLoginAt := now;
          #err { message = "Invalid credentials" }
        } else {
          // Reset failed attempts on success
          voter.failedLoginAttempts := 0;
          // Token: ghanaCardId|timestamp (simple session token)
          let token = ghanaCardId # "|" # now.toText();
          #ok { token }
        };
      };
    };
  };

  /// Return public voter info by Ghana Card ID
  public func getVoterInfo(
    voters      : Map.Map<Common.VoterId, Types.Voter>,
    ghanaCardId : Common.VoterId,
  ) : ?Types.VoterInfo {
    switch (voters.get(ghanaCardId)) {
      case null null;
      case (?v) {
        ?{
          ghanaCardId = v.ghanaCardId;
          phone       = v.phone;
          registeredAt = v.registeredAt;
          hasVoted    = v.hasVoted;
        }
      };
    };
  };

  // ── Vote helpers ─────────────────────────────────────────────────────────

  /// Cast an anonymous ballot; marks voter as voted; increments candidate count
  public func castVote(
    voters         : Map.Map<Common.VoterId, Types.Voter>,
    candidates     : Map.Map<Common.CandidateId, Types.Candidate>,
    ballots        : Set.Set<Common.VoterId>,
    electionStatus : ElectionStatus,
    ghanaCardId    : Common.VoterId,
    candidateId    : Common.CandidateId,
  ) : Types.VoteResult {
    // Check election is open
    switch (electionStatus) {
      case (#closed) { return #err { message = "Election is currently closed" } };
      case (#open) {};
    };
    // Verify voter exists
    switch (voters.get(ghanaCardId)) {
      case null { return #err { message = "Voter not found" } };
      case (?voter) {
        // Check voter hasn't already voted
        if (voter.hasVoted or ballots.contains(ghanaCardId)) {
          return #err { message = "You have already cast your vote" };
        };
        // Verify candidate exists
        switch (candidates.get(candidateId)) {
          case null { #err { message = "Candidate not found" } };
          case (?candidate) {
            // Mark voter as voted
            voter.hasVoted := true;
            // Add to anonymous ballot set
            ballots.add(ghanaCardId);
            // Increment candidate vote count
            candidate.voteCount += 1;
            #ok
          };
        };
      };
    };
  };

  // ── Candidate helpers ────────────────────────────────────────────────────

  /// Convert internal Candidate to public CandidateInfo
  public func toInfo(c : Types.Candidate) : Types.CandidateInfo {
    {
      id        = c.id;
      name      = c.name;
      party     = c.party;
      photo     = c.photo;
      voteCount = c.voteCount;
    }
  };

  /// Return all candidates as shared-safe CandidateInfo list (no voteCount for public)
  public func listCandidates(
    candidates : Map.Map<Common.CandidateId, Types.Candidate>,
  ) : [Types.CandidateInfo] {
    candidates.entries()
      .map<(Common.CandidateId, Types.Candidate), Types.CandidateInfo>(
        func((_, c)) {
          { id = c.id; name = c.name; party = c.party; photo = c.photo; voteCount = 0 }
        }
      )
      .toArray()
  };

  /// Add a new candidate; returns the new id
  public func addCandidate(
    candidates : Map.Map<Common.CandidateId, Types.Candidate>,
    nextId     : Nat,
    payload    : Types.AddCandidatePayload,
  ) : Common.CandidateId {
    let candidate : Types.Candidate = {
      id           = nextId;
      var name     = payload.name;
      var party    = payload.party;
      var photo    = payload.photo;
      var voteCount = 0;
    };
    candidates.add(nextId, candidate);
    nextId
  };

  /// Update an existing candidate's fields in place
  public func updateCandidate(
    candidates : Map.Map<Common.CandidateId, Types.Candidate>,
    payload    : Types.UpdateCandidatePayload,
  ) : Bool {
    switch (candidates.get(payload.id)) {
      case null false;
      case (?candidate) {
        candidate.name  := payload.name;
        candidate.party := payload.party;
        candidate.photo := payload.photo;
        true
      };
    };
  };

  /// Delete a candidate by id
  public func deleteCandidate(
    candidates : Map.Map<Common.CandidateId, Types.Candidate>,
    id         : Common.CandidateId,
  ) : Bool {
    switch (candidates.get(id)) {
      case null false;
      case (?_) {
        candidates.remove(id);
        true
      };
    };
  };

  // re-export type alias so callers do not need a separate import
  public type ElectionStatus = Types.ElectionStatus;
};
