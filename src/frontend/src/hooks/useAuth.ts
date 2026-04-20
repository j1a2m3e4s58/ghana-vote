import { useCallback, useEffect, useState } from "react";
import type { AuthContextValue } from "../types";

const STORAGE_KEY = "ghana_votes_auth";

interface StoredAuth {
  token: string;
  ghanaCardId: string;
  isAdmin: boolean;
}

function loadFromStorage(): StoredAuth | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StoredAuth;
  } catch {
    return null;
  }
}

export function useAuth(): AuthContextValue {
  const [state, setState] = useState<StoredAuth | null>(loadFromStorage);

  useEffect(() => {
    if (state) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [state]);

  const login = useCallback(
    (ghanaCardId: string, token: string, isAdmin: boolean) => {
      setState({ token, ghanaCardId, isAdmin });
    },
    [],
  );

  const logout = useCallback(() => {
    setState(null);
  }, []);

  return {
    token: state?.token ?? null,
    ghanaCardId: state?.ghanaCardId ?? null,
    isAdmin: state?.isAdmin ?? false,
    isAuthenticated: !!state?.token,
    login,
    logout,
  };
}
