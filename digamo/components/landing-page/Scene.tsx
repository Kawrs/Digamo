"use client";
// import { Model } from "../Rubixcub/e";
import { Canvas } from "@react-three/fiber";
import { useProgress, Html } from "@react-three/drei";
import { Suspense } from "react";
import Model from "./Model";

function Loader() {
  const { progress } = useProgress();

  return <Html center>{progress.toFixed(1)} % loaded</Html>;
}

export default function Scene() {
  return (
    <Canvas
      style={{
        width: "40vw",
        // maxWidth: 600,
        height: "30vw",
        maxHeight: 800,
        minHeight: 300,
      }}
    >
      <ambientLight intensity={1} />
      <Suspense fallback={<Loader />}>
        <Model />
      </Suspense>

      
      {/* <OrbitControls enablePan enableZoom enableRotate /> */}
    </Canvas>
  );
}
