import React, { useRef } from "react";
import AdventurePack, { AdventurePackObjects } from "./models/AdventurePack";
import { RigidBody } from "@react-three/rapier";

import { useFrame } from "@react-three/fiber";
import { SPEED } from "../common/constants";
import { GetForwardTranslation } from "../common/utils";

function House() {
  const ref = useRef();

  useFrame((state, delta) => {
    const speed = delta * SPEED;
    const fT = GetForwardTranslation(ref, speed);
    ref.current.setTranslation(fT, true);
    // ObjectsPosition[props.uuid] = fT;

  });
  return (
    <RigidBody
    ref={ref}
    type="fixed"
      colliders={"trimesh"}
      rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
      position={[-1.5, -0.20, 1.70]}
    >
      <AdventurePack
        name={AdventurePackObjects.House}
        rotation={[0, 0, 0]}
        scale={0.027}
      />
    </RigidBody>
  );
}

export default House;
