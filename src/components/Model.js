"use client";
import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export default function Model(props) {
  const modelRef = useRef();
  const { scene } = useGLTF("/models/eve.glb");
  const { pointer } = useThree(); // pointer.x (-1 kiri, +1 kanan), pointer.y (-1 atas, +1 bawah)

  useFrame(() => {
    if (modelRef.current) {
      // Balik sumbu Y biar atas = atas
      const targetX = -pointer.y * 1.2;
      const targetY = pointer.x * 1.2;

      modelRef.current.rotation.x = THREE.MathUtils.lerp(
        modelRef.current.rotation.x,
        targetX,
        0.1
      );
      modelRef.current.rotation.y = THREE.MathUtils.lerp(
        modelRef.current.rotation.y,
        targetY,
        0.1
      );
    }
  });

  return <primitive ref={modelRef} object={scene} {...props} />;
}
