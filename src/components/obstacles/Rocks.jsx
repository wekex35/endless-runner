import { RigidBody, vec3 } from "@react-three/rapier";
import React, { useRef, useState } from "react";
import AdventurePack, { AdventurePackObjects } from "../models/AdventurePack";
import { useFrame } from "@react-three/fiber";
import useGame from "../../stores/useGame";
import { GetForwardTranslation, ObjectsPosition } from "../../common/utils";
import { useEffect } from "react";
import { SPEED } from "../../common/constants";

export default function Rocks(props) {
  const ref = useRef();

  const end = useGame((state) => state.end);

  useFrame((state, delta) => {
    const speed = delta * SPEED;
    const fT = GetForwardTranslation(ref, speed);
    ref.current.setTranslation(fT, true);
    ObjectsPosition[props.uuid] = fT;

    // if(ref.current.translation().z != fT.z){
    //   //console.log(props.pathName,props.uuid,fT);
    // }
    if (ObjectsPosition[props.uuid]?.z > 10) {
      delete ObjectsPosition[props.uuid];
    }
  });
  //console.log("rocks", props.side);
  return (
    <RigidBody
      ref={ref}
      name="Rocks"
      colliders={"hull"}
      type="fixed"
      position={[1, 0.1, props.position[2]]} //{[0, 0.1, props.position[2]]}
      scale={[1.5, 2, 1]} //1.1
      {...props}
      onCollisionEnter={(payload) => {
        end();
      }}
    >
      {/* <mesh position={[0.5, 0.1, 0]}>
          <boxGeometry/>
          <meshBasicMaterial color={props.color}/>
        </mesh> */}
      <group name="Rocks">
        <AdventurePack
          name={AdventurePackObjects.Rocks}
          scale={0.027}
          rotation={[-Math.PI / 2, 0, props.side < 0 ? -Math.PI : 0]}
          position={[0.75 * props.side, -0.1, -2]}
        />
      </group>
    </RigidBody>
  );
}
