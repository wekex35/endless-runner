import React from "react";
import AdventurePack, { AdventurePackObjects } from "../models/AdventurePack";
import { RigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import useGame from "../../stores/useGame";
import { useRef } from "react";
import { GetForwardTranslation, ObjectsPosition } from "../../common/utils";
import { SPEED } from "../../common/constants";

function Pounds(props) {
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
    if(ObjectsPosition[props.uuid]?.z > 10){
     delete ObjectsPosition[props.uuid]
    }
  });
  return (
    <RigidBody
      ref={ref}
      name="Pond"
      type="fixed"
      colliders={"hull"}
      position={[0, -0.2, props.position[2]]}
      scale={1.1}
      {...props}
      onCollisionEnter={(payload) => {
        end();
      }}
    >
      <group name="Pond">
        <AdventurePack
          name={AdventurePackObjects.Pond}
          scale={0.016}
          position={[0, 0.23, 1]}
        />
        <AdventurePack
          name={AdventurePackObjects.Pond_Rocks}
          scale={0.0125}
          rotation={[Math.PI * 0.3, -Math.PI * 0.1, 0]}
          position={[1.1, 0.35, 0.8]}
        />
        <AdventurePack
          name={AdventurePackObjects.Duck}
          scale={0.04}
          rotation={[Math.PI / 2, 0, 0]}
          position={[0, -0.05, 0.8]}
        />
      </group>
    </RigidBody>
  );
}

export default Pounds;
