"use client";
// import { Model } from "../Rubixcub/e";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  useProgress,
  Html,
  ScrollControls,
} from "@react-three/drei";
import { Suspense } from "react";
import Model from "./Model";

function Loader() {
  const { progress, active } = useProgress();

  return <Html center>{progress.toFixed(1)} % loaded</Html>;
}

export default function Scene({ scrollProgress }: { scrollProgress: number }) {
  return (
    <Canvas
      style={{
        width: "100%",
        // maxWidth: 600,
        height: "30vw",
        maxHeight: 1000,
        minHeight: 300,
      }}
    >
      <ambientLight intensity={0.5} />
      <Suspense fallback={<Loader />}>
        <Model />
      </Suspense>

      
      {/* <OrbitControls enablePan enableZoom enableRotate /> */}
    </Canvas>
  );
}
