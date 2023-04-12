import React, { useRef, useState } from "react";
import { PATH_LENGTH, PATH_THICKNESS, PATH_WIDTH } from "../common/constants";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import useGame from "../stores/useGame";
import { useFrame } from "@react-three/fiber";
import { generateUUID } from "three/src/math/MathUtils";
import { RandomMinMax } from "../common/utils";
import { v4 as uuidv4 } from "uuid";

const DynamicPath = ({ details }) => {
  // console.log(details.name,details.scale);
  return (
    <RigidBody
      type="fixed"
      position={details.position}
      scale={details.scale}
      // colliders={}
    >
      <mesh>
        <boxGeometry />
        <meshStandardMaterial color={details.color} />
      </mesh>
    </RigidBody>
  );
};

function Path() {
  const scale = [PATH_WIDTH, PATH_THICKNESS, PATH_LENGTH];
  const position = [0, -PATH_THICKNESS , -PATH_LENGTH / 2];
  const pathCount = useGame((state) => state.pathCount);
  const isPathAdded = useGame((state) => state.isPathAdded);
  const pathAdded = useGame((state) => state.pathAdded);
  const refPath1 = useRef();
  const refPath2 = useRef();

  const [paths, setPath] = useState([
    {
      scale,
      position,
      ref: refPath1,
      color: "skyblue",
      name: "path1",
    },
    {
      scale,
      position: [...position.slice(0, 2), position[2] - PATH_LENGTH],
      ref: refPath2,
      color: "greenyellow",
      name: "path2",
    },
  ]);

  useFrame(() => {
    if (pathCount > 0 && !isPathAdded) {
      const [path1, path2] = paths;
      const rand = RandomMinMax(1, PATH_WIDTH);
      let spawnX = 0;
      if (pathCount % 2) {
        const [sX, sY, sZ] = path2.scale;
        const [pX, pY, pZ] = path2.position;
        if (sX > 1) {
          spawnX = RandomMinMax(0, (PATH_WIDTH - rand) / 2);
          path1.scale = [rand, sY, sZ];
        }
        path1.position = [spawnX, pY, pZ - PATH_LENGTH];

        setPath([path1, path2]);
      } else {
        const [sX, sY, sZ] = path1.scale;
        const [pX, pY, pZ] = path1.position;
        if (sX > 1) {
          spawnX = RandomMinMax(0, (PATH_WIDTH - rand) / 2);
          path2.scale = [RandomMinMax(1, PATH_WIDTH), sY, sZ];
        }
        path2.position = [spawnX, pY, pZ - PATH_LENGTH];
        setPath([path1, path2]);
      }
      pathAdded();
    }
  });

  return (
    <>
      {paths.map((path, i) => (
        <DynamicPath key={uuidv4()} details={path} />
      ))}
    </>
  );
}

export default Path;
