"use client";

import { Component, useState, type ReactNode } from "react";
import { useIsClient } from "@/lib/useIsClient";

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl2") || canvas.getContext("webgl"))
    );
  } catch {
    return false;
  }
}

function Fallback({ label, onRetry }: { label: string; onRetry: () => void }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 rounded-2xl bg-bg-elevated p-8 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-fg-subtle/10 text-2xl" aria-hidden="true">
        ◍
      </div>
      <div>
        <p className="font-medium">Interactive 3D model could not be loaded on this device.</p>
        <p className="mt-1 text-sm text-fg-muted">{label}</p>
      </div>
      <button
        type="button"
        onClick={onRetry}
        className="bio-focus-ring rounded-full border border-panel-border px-4 py-2 text-sm font-medium hover:border-accent/50 hover:text-accent"
      >
        Retry
      </button>
    </div>
  );
}

/** Catches render-time errors thrown while mounting the 3D scene. */
class ErrorCatcher extends Component<{ children: ReactNode; onError: () => void }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

/**
 * Wraps a heavy 3D canvas: checks WebGL support up front, catches mount
 * errors, and always shows a real fallback (poster text + retry) instead
 * of a blank area (spec §61).
 */
export function Canvas3DBoundary({ children, label }: { children: ReactNode; label: string }) {
  const mounted = useIsClient();
  const supported = mounted ? supportsWebGL() : null;
  const [errored, setErrored] = useState(false);
  const [key, setKey] = useState(0);

  if (supported === null) {
    return <div className="h-full w-full animate-pulse rounded-2xl bg-bg-elevated" />;
  }

  if (!supported || errored) {
    return (
      <Fallback
        label={
          !supported
            ? "Your browser or device doesn't appear to support WebGL, which this experience needs."
            : label
        }
        onRetry={() => {
          setErrored(false);
          setKey((k) => k + 1);
        }}
      />
    );
  }

  return (
    <ErrorCatcher key={key} onError={() => setErrored(true)}>
      {children}
    </ErrorCatcher>
  );
}
