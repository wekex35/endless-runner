import { useAnimations, useGLTF } from "@react-three/drei";
import React, { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
export default function Ghost(props) {
  const group = useRef();
  const ghostModel = useGLTF("./models/ghost.glb");
  const [mixer] = useState(new THREE.AnimationMixer(ghostModel.scene));
  useFrame((state, delta) => {
    mixer.update(delta);
  });
  useEffect(() => {
    const action = mixer.clipAction(ghostModel.animations[0]);
    action.play();
  });
  return (
    <mesh position={[0, 0.1, 5.3]} rotation-y={Math.PI} scale={0.7}>
      <primitive object={ghostModel.scene} />
    </mesh>
  );
}
useGLTF.preload("./models/ghost.glb");
