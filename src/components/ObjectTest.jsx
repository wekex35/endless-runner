
import React, { useEffect, useRef, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";



export default function ObjectTest(props) {
  const group = useRef();
  const {scene, nodes, materials, animations, } = useGLTF("./models/scene.glb");
  const { actions } = useAnimations(animations, group);
  const [mixer] = useState(new THREE.AnimationMixer(scene));
  useFrame((state, delta) => {
    mixer.update(delta);
  });
  useEffect(() => {
    const action = mixer.clipAction(animations[0]);
    action.play();
  });
  return (
    <mesh position={[0, 0.1, 5.3]} rotation-y={Math.PI} >
      <primitive object={scene} />
    </mesh>
  );
}

useGLTF.preload("./models/stylized_girl.glb");


