"use client";

import { useSyncExternalStore } from "react";

function subscribe() {
  // Client-mount status never changes after the initial render, so there's
  // nothing to subscribe to — this satisfies useSyncExternalStore's API.
  return () => {};
}

/**
 * Hydration-safe "has this component mounted on the client yet?" check.
 * Prefer this over the classic `useState(false) + useEffect(() =>
 * setState(true))` pattern: useSyncExternalStore's server/client snapshot
 * split is built for exactly this, and doesn't trip the
 * react-hooks/set-state-in-effect lint rule.
 */
export function useIsClient(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
