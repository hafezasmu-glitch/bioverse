"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

const DEFAULT_TARGET = new THREE.Vector3(0, 1.1, 0);
const DEFAULT_CAMERA_POS = new THREE.Vector3(0, 1.2, 2.6);

export function FocusController({
  controlsRef,
  focusPoint,
  resetSignal,
}: {
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
  focusPoint: THREE.Vector3 | null;
  resetSignal: number;
}) {
  const { camera } = useThree();
  const desiredTarget = useRef(DEFAULT_TARGET.clone());
  const desiredCamPos = useRef(DEFAULT_CAMERA_POS.clone());

  useEffect(() => {
    if (focusPoint) {
      desiredTarget.current = focusPoint.clone();
      const dir = new THREE.Vector3(0.35, 0.12, 0.85).normalize();
      desiredCamPos.current = focusPoint.clone().add(dir.multiplyScalar(0.62));
    } else {
      desiredTarget.current = DEFAULT_TARGET.clone();
      desiredCamPos.current = DEFAULT_CAMERA_POS.clone();
    }
    // Depend on the coordinates, not the Vector3 identity: the caller
    // creates a new Vector3 each render even when the selected organ
    // hasn't changed, which would otherwise re-run this every frame.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusPoint?.x, focusPoint?.y, focusPoint?.z]);

  useEffect(() => {
    desiredTarget.current = DEFAULT_TARGET.clone();
    desiredCamPos.current = DEFAULT_CAMERA_POS.clone();
  }, [resetSignal]);

  useFrame(() => {
    const controls = controlsRef.current;
    if (!controls) return;
    controls.target.lerp(desiredTarget.current, 0.08);
    camera.position.lerp(desiredCamPos.current, 0.08);
    controls.update();
  });

  return null;
}
