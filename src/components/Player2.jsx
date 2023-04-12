import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RigidBody, useRapier } from "@react-three/rapier";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import useGame from "../stores/useGame";


export default function Player2() {
  const [subscribeKey, getKeys] = useKeyboardControls();
  const body = useRef();
  const { rapier, world } = useRapier();
  const rapierWorld = world.raw();
  const [smoothCameraPosition] = useState(() => new THREE.Vector3(10, 10, 10));
  const [smoothTargetPosition] = useState(() => new THREE.Vector3());

  const start = useGame((state) => state.start);
  const end = useGame((state) => state.end);
  const restart = useGame((state) => state.restart);
  const blocksCount = useGame((state) => state.blocksCount);

  useEffect(() => {
    const unsubGame = useGame.subscribe(
      (state) => state.phase,
      (value) => {
        if(value == 'ready'){
          
        }
      }
    )
    const unSub = subscribeKey(
      (state) => {
        return state.jump;
      },
      (value) => {
        if (value) {
          jump();
        }
      }
    );
    const unSubAny = subscribeKey(() => {
      start();
    });
    return () => {
      unSub();
      unSubAny();
      unsubGame();
    };
  }, []);

  function jump() {
    const origin = body.current.translation();
    origin.y = 0.31;
    const direction = { x: 0, y: -1, z: 0 };
    const ray = new rapier.Ray(origin, direction);
    const hit = rapierWorld.castRay(ray, 10, true);
    if (hit.toi < 0.15) {
      body.current.applyImpulse({ x: 0, y: 0.5, z: 0 });
    }
  }
  const reset = () => {
    subscribeWith
  }

  useFrame((state, delta) => {
    const { forward, backward, leftward, rightward, jump } = getKeys();
    const impulse = { x: 0, y: 0, z: 0 };
    const torque = { x: 0, y: 0, z: 0 };

    const impulseStrength = 0.6 * delta;
    const torqueStrength = 0.2 * delta;

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

    body.current.applyImpulse(impulse);
    body.current.applyTorqueImpulse(torque);

    // Camera
    const bodyPosition = body.current.translation();
    const cameraPosition = new THREE.Vector3();
    cameraPosition.copy(bodyPosition);
    cameraPosition.z += 2.25;
    cameraPosition.y += 0.65;

    const cameraTarget = new THREE.Vector3();
    cameraTarget.copy(bodyPosition);
    cameraTarget.y += 0.25;

    smoothCameraPosition.lerp(cameraPosition, 5 * delta);
    smoothTargetPosition.lerp(cameraTarget, 5 * delta);

    state.camera.position.copy(smoothCameraPosition);
    state.camera.lookAt(smoothTargetPosition);

    /**
     * Phases
     */
    if (bodyPosition.z < -(blocksCount * 4 + 2)) {
      end();
    }
    if (bodyPosition.y < -4) {
      restart();
    }
  });
  return (
    <RigidBody
      ref={body}
      colliders="ball"
      restitution={0.2}
      friction={1}
      position={[0, 1, 0]}
      linearDamping={0.5}
      angularDamping={0.5}
    >
      <mesh castShadow>
        <icosahedronGeometry args={[0.3, 1]} />
        <meshStandardMaterial flatShading color={"mediumpurple"} />
      </mesh>
    </RigidBody>
  );
}
