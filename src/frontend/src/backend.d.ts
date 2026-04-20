import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export type VoteResult = {
    __kind__: "ok";
    ok: null;
} | {
    __kind__: "err";
    err: {
        message: string;
    };
};
export interface ElectionResults {
    totalVotes: bigint;
    electionStatus: ElectionStatus;
    candidates: Array<CandidateInfo>;
}
export interface CandidateInfo {
    id: CandidateId;
    voteCount: bigint;
    name: string;
    party: string;
    photo: ExternalBlob;
}
export interface AddCandidatePayload {
    name: string;
    party: string;
    photo: ExternalBlob;
}
export type VoterId = string;
export interface UpdateCandidatePayload {
    id: CandidateId;
    name: string;
    party: string;
    photo: ExternalBlob;
}
export type RegisterResult = {
    __kind__: "ok";
    ok: null;
} | {
    __kind__: "err";
    err: {
        message: string;
    };
};
export type CandidateId = bigint;
export type LoginResult = {
    __kind__: "ok";
    ok: {
        token: string;
    };
} | {
    __kind__: "err";
    err: {
        message: string;
    };
};
export enum ElectionStatus {
    closed = "closed",
    open = "open"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addCandidate(payload: AddCandidatePayload): Promise<CandidateId>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    castVote(ghanaCardId: VoterId, candidateId: CandidateId): Promise<VoteResult>;
    deleteCandidate(id: CandidateId): Promise<boolean>;
    getCallerUserRole(): Promise<UserRole>;
    getCandidates(): Promise<Array<CandidateInfo>>;
    getElectionStatus(): Promise<ElectionStatus>;
    getResults(): Promise<ElectionResults>;
    isCallerAdmin(): Promise<boolean>;
    login(ghanaCardId: VoterId, passwordHash: string): Promise<LoginResult>;
    registerVoter(ghanaCardId: VoterId, phone: string, passwordHash: string): Promise<RegisterResult>;
    setElectionStatus(status: ElectionStatus): Promise<void>;
    updateCandidate(payload: UpdateCandidatePayload): Promise<boolean>;
}
