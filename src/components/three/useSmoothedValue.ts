"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";

/**
 * Smoothly eases a numeric prop toward its target every frame, only
 * triggering a React re-render while the value is still moving. Used for
 * Explode/Assemble and other toggles that should transition rather than
 * snap (spec: "transitions should be smooth").
 */
export function useSmoothedValue(target: number, speed = 0.08): number {
  const [value, setValue] = useState(target);
  const valueRef = useRef(target);

  useFrame(() => {
    const next = valueRef.current + (target - valueRef.current) * speed;
    const clamped = Math.abs(target - next) < 0.001 ? target : next;
    if (Math.abs(clamped - valueRef.current) > 0.0001) {
      valueRef.current = clamped;
      setValue(clamped);
    }
  });

  return value;
}
