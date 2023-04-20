import React, { useRef, useState } from "react";
import { PATH_LENGTH, PATH_THICKNESS, PATH_WIDTH } from "../common/constants";
import { CuboidCollider, RigidBody, vec3 } from "@react-three/rapier";
import useGame from "../stores/useGame";
import { useFrame, useLoader } from "@react-three/fiber";
import { generateUUID } from "three/src/math/MathUtils";
import { RandomMinMax } from "../common/utils";
import { v4 as uuidv4 } from "uuid";
import { Clock, TextureLoader, Vector2, Vector3 } from "three";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useEffect } from "react";

const DynamicPath = React.forwardRef(({ details }, ref) => {
  console.log("===>", ref);

  const [colorMap, displacementMap, normalMap, roughnessMap, aoMap] =
    useTexture([
      "../textures/stone_path/Stone_Path_008_basecolor.jpg",
      "../textures/stone_path/Stone_Path_008_height.png",
      "../textures/stone_path/Stone_Path_008_normal.jpg",
      "../textures/stone_path/Stone_Path_008_roughness.jpg",
      "../textures/stone_path/Stone_Path_008_ambientOcclusion.jpg",
    ]);
  colorMap.repeat = new THREE.Vector2(1, 10);
  colorMap.wrapS = THREE.RepeatWrapping;
  colorMap.wrapT = THREE.RepeatWrapping;

  const cP = ref.current?.translation();
  const position =
    ref.current //&& (details.phase == "ready" || details.phase == "ended")
      ? [cP.x, cP.y, cP.z]
      : details.position;
  return (
    <RigidBody
      type="fixed"
      position={position}
      ref={ref}
      colliders={"cuboid"}
      userData={{ name: details.name }}
    >
      <mesh name="path">
        <boxGeometry args={details.scale} name="pathBox" />
        <meshStandardMaterial
          displacementScale={0}
          factor={4}
          map={colorMap}
          displacementMap={displacementMap}
          normalMap={normalMap}
          roughnessMap={roughnessMap}
          aoMap={aoMap}
        />
      </mesh>
      <mesh
        castShadow={true}
        name="obstacle"
        scale={[PATH_WIDTH / 2, 2, 1]}
        position={[PATH_WIDTH * 0.25, 1, 0]}
      >
        <boxGeometry name="obstacleBox" />
        <meshStandardMaterial color={"red"} />
      </mesh>
    </RigidBody>
  );
});

function Path() {
  const scale = [PATH_WIDTH, PATH_THICKNESS, PATH_LENGTH];
  const position = [0, -PATH_THICKNESS, -PATH_LENGTH / 2];
  const pathCount = useGame((state) => state.pathCount);
  const isPathAdded = useGame((state) => state.isPathAdded);
  const pathAdded = useGame((state) => state.pathAdded);
  const refPath1 = useRef();
  const refPath2 = useRef();
  const phase = useGame((state) => state.phase);
  const addPath = useGame((state) => state.addPath);

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

  useEffect(() => {
    if (phase == "ready" || phase == "ended") {
      refPath1.current = undefined;
      refPath2.current = undefined;
    }
  }, [phase]);

  const getUpdatedPath = (ref, speed) => {
    const refObject = ref.current;
    const curPosition = refObject.translation().z;
    if (curPosition > PATH_LENGTH / 2) {
      return vec3({ x: 0, y: 0, z: -PATH_LENGTH / 2 - PATH_LENGTH });
    }
    return vec3({ x: 0, y: 0, z: curPosition + speed });
  };

  useFrame((state, delta) => {
    const speed = delta * 5;

    // refPath2.current.position.z += speed;
    if (phase === "playing") {
      refPath1.current.setTranslation(getUpdatedPath(refPath1, speed), true);
      refPath2.current.setTranslation(getUpdatedPath(refPath2, speed), true);
    }
    if (pathCount > 0 && !isPathAdded) {
      // const [path1, path2] = paths;
      //   const rand = RandomMinMax(1, PATH_WIDTH);
      //   let spawnX = 0;
      //   if (pathCount % 2) {
      //     const [sX, sY, sZ] = path2.scale;
      //     const [pX, pY, pZ] = path2.position;
      //     if (sX > 1) {
      //       spawnX = RandomMinMax(0, (PATH_WIDTH - rand) / 2);
      //       path1.scale = [rand, sY, sZ];
      //     }
      //     path1.position = [spawnX, pY, pZ - PATH_LENGTH];
      //     setPath([path1, path2]);
      //   } else {
      //     const [sX, sY, sZ] = path1.scale;
      //     const [pX, pY, pZ] = path1.position;
      //     if (sX > 1) {
      //       spawnX = RandomMinMax(0, (PATH_WIDTH - rand) / 2);
      //       path2.scale = [RandomMinMax(1, PATH_WIDTH), sY, sZ];
      //     }
      //     path2.position = [spawnX, pY, pZ - PATH_LENGTH];
      //     setPath([path1, path2]);
      //   }
      // pathAdded();
    }
  });

  return (
    <>
      {paths.map((path, i) => (
        <DynamicPath
          key={uuidv4()}
          phase={phase}
          details={path}
          ref={path.ref}
        />
      ))}
    </>
  );
}

export default Path;
