import Map          "mo:core/Map";
import Set          "mo:core/Set";
import Time         "mo:core/Time";
import Runtime      "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Storage      "mo:caffeineai-object-storage/Storage";
import VotingLib    "../lib/voting";
import Common       "../types/common";
import Types        "../types/voting";

/// Public HTTP-facing API for the voting domain.
/// State is injected; electionStatus and nextCandidateId are owned here.
mixin (
  accessControlState : AccessControl.AccessControlState,
  voters             : Map.Map<Common.VoterId, Types.Voter>,
  candidates         : Map.Map<Common.CandidateId, Types.Candidate>,
  ballots            : Set.Set<Common.VoterId>,
) {

  var electionStatus  : Types.ElectionStatus = #closed;
  var nextCandidateId : Nat = 4; // start after 3 seeded candidates

  // ── Seed 3 sample presidential candidates at initialization ───────────
  do {
    let emptyBlob : Storage.ExternalBlob = "" : Blob;
    candidates.add(1, {
      id            = 1;
      var name      = "Mahamudu Bawumia";
      var party     = "New Patriotic Party (NPP)";
      var photo     = emptyBlob;
      var voteCount = 0;
    });
    candidates.add(2, {
      id            = 2;
      var name      = "John Dramani Mahama";
      var party     = "National Democratic Congress (NDC)";
      var photo     = emptyBlob;
      var voteCount = 0;
    });
    candidates.add(3, {
      id            = 3;
      var name      = "Alan John Kwadwo Kyerematen";
      var party     = "Independent / Movement for Change";
      var photo     = emptyBlob;
      var voteCount = 0;
    });
  };

  // ── Voter registration & auth ─────────────────────────────────────────

  public shared func registerVoter(
    ghanaCardId  : Common.VoterId,
    phone        : Text,
    passwordHash : Text,
  ) : async Types.RegisterResult {
    let now = Time.now();
    VotingLib.registerVoter(voters, ghanaCardId, phone, passwordHash, now)
  };

  public shared func login(
    ghanaCardId  : Common.VoterId,
    passwordHash : Text,
  ) : async Types.LoginResult {
    let now = Time.now();
    VotingLib.loginVoter(voters, ghanaCardId, passwordHash, now)
  };

  // ── Voting ────────────────────────────────────────────────────────────

  public shared func castVote(
    ghanaCardId : Common.VoterId,
    candidateId : Common.CandidateId,
  ) : async Types.VoteResult {
    VotingLib.castVote(voters, candidates, ballots, electionStatus, ghanaCardId, candidateId)
  };

  // ── Candidate queries ─────────────────────────────────────────────────

  public query func getCandidates() : async [Types.CandidateInfo] {
    VotingLib.listCandidates(candidates)
  };

  // ── Election status ───────────────────────────────────────────────────

  public query func getElectionStatus() : async Types.ElectionStatus {
    electionStatus
  };

  // ── Admin: results ────────────────────────────────────────────────────

  public query ({ caller }) func getResults() : async Types.ElectionResults {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view results");
    };
    let candidateList = candidates.entries()
      .map(func((_, c) : (Common.CandidateId, Types.Candidate)) : Types.CandidateInfo { VotingLib.toInfo(c) })
      .toArray();
    let total = candidateList.foldLeft(
      0,
      func(acc : Nat, c : Types.CandidateInfo) : Nat { acc + c.voteCount },
    );
    {
      candidates     = candidateList;
      totalVotes     = total;
      electionStatus = electionStatus;
    }
  };

  // ── Admin: candidate management ───────────────────────────────────────

  public shared ({ caller }) func addCandidate(
    payload : Types.AddCandidatePayload,
  ) : async Common.CandidateId {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can add candidates");
    };
    if (payload.name.size() == 0) Runtime.trap("Candidate name is required");
    if (payload.party.size() == 0) Runtime.trap("Party name is required");
    let id = VotingLib.addCandidate(candidates, nextCandidateId, payload);
    nextCandidateId += 1;
    id
  };

  public shared ({ caller }) func updateCandidate(
    payload : Types.UpdateCandidatePayload,
  ) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update candidates");
    };
    VotingLib.updateCandidate(candidates, payload)
  };

  public shared ({ caller }) func deleteCandidate(
    id : Common.CandidateId,
  ) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete candidates");
    };
    VotingLib.deleteCandidate(candidates, id)
  };

  // ── Admin: election control ───────────────────────────────────────────

  public shared ({ caller }) func setElectionStatus(
    status : Types.ElectionStatus,
  ) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can change election status");
    };
    electionStatus := status;
  };
};
