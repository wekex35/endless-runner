import React, { useRef, useState, useEffect, useMemo } from "react";
import { PATH_LENGTH, PATH_SPAWN_OFFSET, PATH_THICKNESS, PATH_WIDTH, SPEED } from "../common/constants";
import { CuboidCollider, RigidBody, vec3 } from "@react-three/rapier";
import useGame from "../stores/useGame";
import { useFrame, useLoader } from "@react-three/fiber";
import { generateUUID, randFloat } from "three/src/math/MathUtils";
import { ObjectsPosition, ObstacleList, RandomMinMax } from "../common/utils";

import { Clock, TextureLoader, Vector2, Vector3 } from "three";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import Rocks from "./obstacles/Rocks";
import Coins from "./obstacles/Coins";
import { v4 as uuidv4 } from "uuid";

const DynamicPath = React.forwardRef(({ details, phase }, ref) => {
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
  // const objPositions = useGame((state) => state.objPositions);  

  const cP = ref.current?.translation();
  let position =
    ref.current && (phase == "playing" || phase == "pause")
      ? [cP.x, cP.y, cP.z]
      : details.position;
  if(phase == "ended"){
    position = details.position;
  }
  //console.log(position);

  return (
    <group>
      {details.obstacles.map(({ side, Obstacle, posZ, uuid }) => {
            // //console.log({
            //   name: details.name,
            //   'pathZ': cP?.z,
            //   'posZ' : posZ,
            //   'uuid': uuid,
            //   'last_update_position':  ObjectsPosition[uuid],
            //   'update_position': ObjectsPosition[uuid]?.z  ||  posZ,
            // })
        return (
      
        <Obstacle
          pathName={details.name}
          key={uuid}
          uuid={uuid}
          color={details.color}
          side={side}
          position={[0, 0, ObjectsPosition[uuid]?.z  ||  posZ]}
        />
      )})}
      {/* <Coins position={position} /> */}
      {/* <Coins position={[0, 0, randFloat(position[2], position[2] - 40)]} /> */}
      <RigidBody
        type="fixed"
        position={position}
        ref={ref}
        name={details.name}
        colliders={"trimesh"}
        userData={{ name: details.name }}
      >
        <mesh name="path">
          <boxGeometry args={details.scale} name="pathBox" />
          <meshStandardMaterial
            displacementScale={0}
            factor={4}
            // color={details.color}
            map={colorMap}
            displacementMap={displacementMap}
            normalMap={normalMap}
            roughnessMap={roughnessMap}
            aoMap={aoMap}
          />
        </mesh>

        {/* <mesh
        castShadow={true}
        name="obstacle"
        scale={[PATH_WIDTH / 2, 2, 1]}
        position={[PATH_WIDTH * 0.25, 1, 0]}
      >
        <boxGeometry name="obstacleBox" />
        <meshStandardMaterial color={"red"} />
      </mesh> */}
      </RigidBody>
    </group>
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
  const addScore = useGame((state) => state.addScore);
  

  const obs1 = useMemo(() => [], [])
  const obs2 = useMemo(() => ObstacleList(
    -PATH_LENGTH,
    - PATH_LENGTH * 2,
    "path1",
  ), [])
  const [first, setfirst] = useState(false)
  const [paths, setPath] = useState([
    {
      scale,
      position,
      ref: refPath1,
      color: "black",
      name: "path0",
      obstacles: obs1,
    },
    {
      scale,
      position: [...position.slice(0, 2), position[2] - PATH_LENGTH],
      ref: refPath2,
      color: "greenyellow",
      name: "path1",
      obstacles: obs2
    },
  ]);

  useEffect(() => {}, []);

  const getUpdatedPath = (ref, speed) => {
    const refObject = ref.current;
    const curPosition = refObject.translation().z;
    if (curPosition > (PATH_LENGTH / 2)+PATH_SPAWN_OFFSET  ) {
      
      const pathNo = refObject.userData.name.split("path")[1];
      const newArr = [...paths];
      const newZ = (-PATH_LENGTH / 2 - PATH_LENGTH) + PATH_SPAWN_OFFSET //- 3;
      //console.log('====',(-PATH_LENGTH / 2 - PATH_LENGTH));
      newArr[pathNo].obstacles = ObstacleList(newZ+PATH_LENGTH/2, (newZ - PATH_LENGTH)+PATH_LENGTH/2,'test');
      setPath(newArr);
      return vec3({ x: 0, y: 0, z: newZ });
    }
    return vec3({ x: 0, y: 0, z: curPosition + speed });
  };
//console.log(paths);
  useFrame((state, delta) => {
    const speed = delta * SPEED;
    if (phase === "playing") {
      addScore(1, state.clock.getElapsedTime());
      refPath1.current.setTranslation(getUpdatedPath(refPath1, speed), true);
      refPath2.current.setTranslation(getUpdatedPath(refPath2, speed), true);
    } else {
      // if (state.clock.running) {
      //   state.clock.stop();
      // }
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
//console.log(phase);
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
