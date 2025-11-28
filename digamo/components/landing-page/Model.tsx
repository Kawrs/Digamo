import React, { useRef, useEffect, ComponentProps, useState } from "react";
import { useGLTF, useAnimations, PerspectiveCamera } from "@react-three/drei";
import { Group } from "three";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

export default function Model(props: Partial<ComponentProps<"primitive">>) {
  const group = useRef<Group>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const tmpPos = useRef(new THREE.Vector3());
  const tmpQuat = useRef(new THREE.Quaternion());

  const { scene, animations } = useGLTF("/scene.glb");
  const { actions } = useAnimations(animations, group);

  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [scroll, setScroll] = useState(0);

  const headRef = useRef<THREE.Object3D | null>(null);
  const hatRef = useRef<THREE.Object3D | null>(null);
  const spoonRef = useRef<THREE.Object3D | null>(null);
  const forkRef = useRef<THREE.Object3D | null>(null);
  const hgearleftRef = useRef<THREE.Object3D | null>(null);
  const hgearrightRef = useRef<THREE.Object3D | null>(null);
  const leftArmRef = useRef<THREE.Object3D | null>(null);
  const rightArmRef = useRef<THREE.Object3D | null>(null);
  const needleRef = useRef<THREE.Object3D | null>(null);

  useEffect(() => {
    if (actions && animations.length > 0) {
      animations.forEach((clip) => {
        actions[clip.name]?.reset().play();
      });
    }
  }, [actions, animations]);

  //para mouse
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // para scrolling
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setScroll(docHeight > 0 ? scrollY / docHeight : 0);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!scene) return;
    // blender lights
    type MaybeLight = THREE.Light & { intensity?: number; isLight?: boolean };
    scene.traverse((child: THREE.Object3D) => {
      const maybeLight = child as MaybeLight;
      if (maybeLight.isLight) {
        try {
          maybeLight.visible = true;
          if (maybeLight.intensity === undefined) maybeLight.intensity = 300;
        } catch {
          // ignore
        }
      }
    });

    const cameraNode = scene.getObjectByName("aCamera") as
      | THREE.PerspectiveCamera
      | undefined;
    const cam = cameraRef.current;
    if (cameraNode && cam) {
      cameraNode.getWorldPosition(tmpPos.current);
      cameraNode.getWorldQuaternion(tmpQuat.current);
      cam.position.copy(tmpPos.current);
      cam.quaternion.copy(tmpQuat.current);
      cam.fov = cameraNode.fov;
      cam.near = cameraNode.near;
      cam.far = cameraNode.far;
      cam.updateProjectionMatrix();
    }

    headRef.current = scene.getObjectByName("Head") || null;
    hatRef.current = scene.getObjectByName("Hat") || null;
    spoonRef.current = scene.getObjectByName("Spoon") || null;
    forkRef.current = scene.getObjectByName("Fork_ModelMain") || null;
    hgearleftRef.current = scene.getObjectByName("HeadGearL") || null;
    hgearrightRef.current = scene.getObjectByName("HeadGearR") || null;
    leftArmRef.current = scene.getObjectByName("Arm_Upper.L") || null;
    rightArmRef.current = scene.getObjectByName("Arm_Upper.R") || null;
    needleRef.current = scene.getObjectByName("GaugeNeedle") || null;
  }, [scene]);

  useFrame(() => {
    if (headRef.current) {
      headRef.current.rotation.y +=
        (mouse.x * 0.5 - headRef.current.rotation.y) * 0.1;
      headRef.current.rotation.x +=
        (-mouse.y * 0.2 - headRef.current.rotation.x) * 0.1;
    }

    if (hatRef.current && forkRef.current && spoonRef.current) {
      hatRef.current.rotation.y +=
        (mouse.x * 0.5 - hatRef.current.rotation.y) * 0.1;
      spoonRef.current.rotation.y +=
        (mouse.x * 0.5 - hatRef.current.rotation.y) * 0.1;
      forkRef.current.rotation.y +=
        (mouse.x * 0.5 - hatRef.current.rotation.y) * 0.1;
      //y
      hatRef.current.rotation.x +=
        (-mouse.y * 0.2 - hatRef.current.rotation.x) * 0.1;
      spoonRef.current.rotation.x +=
        (-mouse.y * 0.2 - hatRef.current.rotation.x) * 0.1;
      forkRef.current.rotation.x +=
        (-mouse.y * 0.2 - hatRef.current.rotation.x) * 0.1;
    }

    //arms animation di pa mu gana
    const armLift = (scroll * Math.PI) / 4;
    if (leftArmRef.current) {
      leftArmRef.current.rotation.x = -armLift;
    }
    if (rightArmRef.current) {
      rightArmRef.current.rotation.x = -armLift;
    }
  });

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef as unknown as React.Ref<THREE.PerspectiveCamera>}
        makeDefault
      />
      <primitive ref={group} object={scene} {...props} />
    </>
  );
}
