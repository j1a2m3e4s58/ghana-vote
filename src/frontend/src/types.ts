import type {
  CandidateInfo,
  ElectionResults,
  ElectionStatus,
  LoginResult,
  RegisterResult,
  VoteResult,
} from "./backend";

export type {
  CandidateInfo,
  ElectionResults,
  ElectionStatus,
  LoginResult,
  RegisterResult,
  VoteResult,
};

export type {
  CandidateId,
  VoterId,
  AddCandidatePayload,
  UpdateCandidatePayload,
} from "./backend";
export { UserRole } from "./backend";

export interface AuthState {
  token: string | null;
  ghanaCardId: string | null;
  isAdmin: boolean;
  isAuthenticated: boolean;
}

export interface AuthContextValue extends AuthState {
  login: (ghanaCardId: string, token: string, isAdmin: boolean) => void;
  logout: () => void;
}
