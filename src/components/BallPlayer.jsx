import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import React, { useRef, useState } from "react";
import * as THREE from "three";
import { PATH_LENGTH } from "../common/constants";
import { useKeyboardControls } from "@react-three/drei";
import useGame from "../stores/useGame";

function BallPlayer() {
  const [smoothCameraPosition] = useState(() => new THREE.Vector3(10, 10, 10));
  const [smoothTargetPosition] = useState(() => new THREE.Vector3());
  const [subscribeKey, getKeys] = useKeyboardControls();
  const pathCount = useGame((state) => state.pathCount);
  const addPath = useGame((state) => state.addPath);

  const player = useRef();

  const playerController = (delta) => {
    const { forward, backward, leftward, rightward, jump } = getKeys();
    const impulse = { x: 0, y: 0, z: 0 };
    const torque = { x: 0, y: 0, z: 0 };

    const impulseStrength = 0.6 * delta;
    const torqueStrength = 0.6 * delta;

    if (forward) {
      impulse.z -= impulseStrength;
      torque.x -= torqueStrength;
    }
    if (rightward) {
      impulse.x += impulseStrength;
      torque.z -= torqueStrength;
    }

    if (backward) {
      impulse.z += impulseStrength;
      torque.x += torqueStrength;
    }

    if (leftward) {
      impulse.x -= impulseStrength;
      torque.z += torqueStrength;
    }


    player.current.applyImpulse(impulse);
    player.current.applyTorqueImpulse(torque);
  };

  const cameraMovement = (state, delta) => {
    // Camera
    const playerPosition = player.current.translation();
    const cameraPosition = new THREE.Vector3();
    cameraPosition.copy(playerPosition);
    cameraPosition.z += 2.25;
    cameraPosition.y += 0.65;

    const cameraTarget = new THREE.Vector3();
    cameraTarget.copy(playerPosition);
    cameraTarget.y += 0.25;

    smoothCameraPosition.lerp(cameraPosition, 5 * delta);
    smoothTargetPosition.lerp(cameraTarget, 5 * delta);

    state.camera.position.copy(smoothCameraPosition);
    state.camera.lookAt(smoothTargetPosition);
  };


  useFrame((state, delta) => {
    playerController(delta);
    cameraMovement(state, delta);

    const playerPosition = player.current.translation();
    if (
      playerPosition.z + PATH_LENGTH * 0.25 <
      -PATH_LENGTH * pathCount - PATH_LENGTH
    ) {

      addPath();
    }
  });
  return (
    <RigidBody
      ref={player}
      position={[0, 1, -2]}
      colliders="ball"
      restitution={0.2}
      friction={1}
      linearDamping={0.5}
      angularDamping={0.5}
    >
      <mesh>
        <icosahedronGeometry args={[0.3, 1]} />
        <meshStandardMaterial flatShading color={"mediumpurple"} />
      </mesh>
    </RigidBody>
  );
}

export default BallPlayer;
