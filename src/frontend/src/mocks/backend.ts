import type { backendInterface } from "../backend";
import { ElectionStatus, UserRole } from "../backend";

export const mockBackend: backendInterface = {
  // Internal object-storage and access-control stubs (required by backendInterface)
  _immutableObjectStorageBlobsAreLive: async (_hashes) => [],
  _immutableObjectStorageBlobsToDelete: async () => [],
  _immutableObjectStorageConfirmBlobDeletion: async (_blobs) => undefined,
  _immutableObjectStorageCreateCertificate: async (_blobHash) => ({
    method: "PUT",
    blob_hash: _blobHash,
  }),
  _immutableObjectStorageRefillCashier: async (_info) => ({}),
  _immutableObjectStorageUpdateGatewayPrincipals: async () => undefined,
  _initializeAccessControl: async () => undefined,
  addCandidate: async (_payload) => BigInt(1),
  assignCallerUserRole: async (_user, _role) => undefined,
  castVote: async (_ghanaCardId, _candidateId) => ({
    __kind__: "ok",
    ok: null,
  }),
  deleteCandidate: async (_id) => true,
  getCallerUserRole: async () => UserRole.user,
  getCandidates: async () => [
    {
      id: BigInt(1),
      voteCount: BigInt(4320),
      name: "Kwame Mensah",
      party: "New Patriotic Party (NPP)",
      photo: {
        getBytes: async () => new Uint8Array(),
        getDirectURL: () =>
          "https://placehold.co/120x120/CE1126/ffffff?text=KM",
        withUploadProgress: (fn) => {
          void fn;
          return {
            getBytes: async () => new Uint8Array(),
            getDirectURL: () =>
              "https://placehold.co/120x120/CE1126/ffffff?text=KM",
            withUploadProgress: () => ({} as never),
          } as never;
        },
      } as never,
    },
    {
      id: BigInt(2),
      voteCount: BigInt(3890),
      name: "Ama Owusu-Ansah",
      party: "National Democratic Congress (NDC)",
      photo: {
        getBytes: async () => new Uint8Array(),
        getDirectURL: () =>
          "https://placehold.co/120x120/006B3F/ffffff?text=AO",
        withUploadProgress: (fn) => {
          void fn;
          return {
            getBytes: async () => new Uint8Array(),
            getDirectURL: () =>
              "https://placehold.co/120x120/006B3F/ffffff?text=AO",
            withUploadProgress: () => ({} as never),
          } as never;
        },
      } as never,
    },
    {
      id: BigInt(3),
      voteCount: BigInt(1240),
      name: "Kofi Asante",
      party: "People's National Convention (PNC)",
      photo: {
        getBytes: async () => new Uint8Array(),
        getDirectURL: () =>
          "https://placehold.co/120x120/FCD116/000000?text=KA",
        withUploadProgress: (fn) => {
          void fn;
          return {
            getBytes: async () => new Uint8Array(),
            getDirectURL: () =>
              "https://placehold.co/120x120/FCD116/000000?text=KA",
            withUploadProgress: () => ({} as never),
          } as never;
        },
      } as never,
    },
  ],
  getElectionStatus: async () => ElectionStatus.open,
  getResults: async () => ({
    totalVotes: BigInt(9450),
    electionStatus: ElectionStatus.open,
    candidates: [
      {
        id: BigInt(1),
        voteCount: BigInt(4320),
        name: "Kwame Mensah",
        party: "New Patriotic Party (NPP)",
        photo: {
          getBytes: async () => new Uint8Array(),
          getDirectURL: () =>
            "https://placehold.co/120x120/CE1126/ffffff?text=KM",
          withUploadProgress: () => ({} as never),
        } as never,
      },
      {
        id: BigInt(2),
        voteCount: BigInt(3890),
        name: "Ama Owusu-Ansah",
        party: "National Democratic Congress (NDC)",
        photo: {
          getBytes: async () => new Uint8Array(),
          getDirectURL: () =>
            "https://placehold.co/120x120/006B3F/ffffff?text=AO",
          withUploadProgress: () => ({} as never),
        } as never,
      },
      {
        id: BigInt(3),
        voteCount: BigInt(1240),
        name: "Kofi Asante",
        party: "People's National Convention (PNC)",
        photo: {
          getBytes: async () => new Uint8Array(),
          getDirectURL: () =>
            "https://placehold.co/120x120/FCD116/000000?text=KA",
          withUploadProgress: () => ({} as never),
        } as never,
      },
    ],
  }),
  isCallerAdmin: async () => false,
  login: async (_ghanaCardId, _passwordHash) => ({
    __kind__: "ok",
    ok: { token: "mock-jwt-token-abc123" },
  }),
  registerVoter: async (_ghanaCardId, _phone, _passwordHash) => ({
    __kind__: "ok",
    ok: null,
  }),
  setElectionStatus: async (_status) => undefined,
  updateCandidate: async (_payload) => true,
};
