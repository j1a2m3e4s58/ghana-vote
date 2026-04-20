import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type {
  AddCandidatePayload,
  CandidateInfo,
  ElectionResults,
  ElectionStatus,
  LoginResult,
  RegisterResult,
  UpdateCandidatePayload,
  VoteResult,
} from "../types";

function useBackend() {
  return useActor(createActor);
}

// ── Read queries ─────────────────────────────────────────────────────────────

export function useGetCandidates() {
  const { actor, isFetching } = useBackend();
  return useQuery<CandidateInfo[]>({
    queryKey: ["candidates"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCandidates();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetElectionStatus() {
  const { actor, isFetching } = useBackend();
  return useQuery<ElectionStatus>({
    queryKey: ["electionStatus"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      return actor.getElectionStatus();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetResults() {
  const { actor, isFetching } = useBackend();
  return useQuery<ElectionResults>({
    queryKey: ["results"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      return actor.getResults();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 5_000, // auto-refresh every 5s for admin dashboard
  });
}

// ── Mutations ─────────────────────────────────────────────────────────────────

export function useRegisterVoter() {
  const { actor } = useBackend();
  return useMutation<
    RegisterResult,
    Error,
    { ghanaCardId: string; phone: string; passwordHash: string }
  >({
    mutationFn: async ({ ghanaCardId, phone, passwordHash }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.registerVoter(ghanaCardId, phone, passwordHash);
    },
  });
}

export function useLogin() {
  const { actor } = useBackend();
  return useMutation<
    LoginResult,
    Error,
    { ghanaCardId: string; passwordHash: string }
  >({
    mutationFn: async ({ ghanaCardId, passwordHash }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.login(ghanaCardId, passwordHash);
    },
  });
}

export function useCastVote() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation<
    VoteResult,
    Error,
    { ghanaCardId: string; candidateId: bigint }
  >({
    mutationFn: async ({ ghanaCardId, candidateId }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.castVote(ghanaCardId, candidateId);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["results"] });
      qc.invalidateQueries({ queryKey: ["candidates"] });
    },
  });
}

export function useAddCandidate() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation<bigint, Error, AddCandidatePayload>({
    mutationFn: async (payload) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.addCandidate(payload);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["candidates"] });
    },
  });
}

export function useUpdateCandidate() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation<boolean, Error, UpdateCandidatePayload>({
    mutationFn: async (payload) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.updateCandidate(payload);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["candidates"] });
    },
  });
}

export function useDeleteCandidate() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation<boolean, Error, bigint>({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.deleteCandidate(id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["candidates"] });
    },
  });
}

export function useSetElectionStatus() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation<void, Error, ElectionStatus>({
    mutationFn: async (status) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.setElectionStatus(status);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["electionStatus"] });
      qc.invalidateQueries({ queryKey: ["results"] });
    },
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching } = useBackend();
  return useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}
