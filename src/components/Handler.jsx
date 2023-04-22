import React from "react";
import { useControls } from "leva";
import { PATH_LENGTH } from "../common/constants";
export default function Handler() {
  const { zAxis } = useControls({
    zAxis: {
      value: -20,
      min: -120,
      max: 120,
    },
  });
  return (
    <>
     
      <mesh position={[0, 0, PATH_LENGTH]} scale={[3,5,1]}>
        <boxGeometry />
        <meshBasicMaterial color={"green"} />
      </mesh>
      <mesh position={[0, 0, -2*PATH_LENGTH] } scale={[3,5,1]}>
        <boxGeometry />
        <meshBasicMaterial color={"green"} />
      </mesh>
      <mesh position={[0, 0, zAxis]} scale={[1, 3, 1]}>
        <boxGeometry />
        <meshBasicMaterial color={"green"} />
      </mesh>
    </>
  );
}
