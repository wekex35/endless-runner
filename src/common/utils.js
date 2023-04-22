import { vec3 } from "@react-three/rapier";
import { randInt } from "three/src/math/MathUtils";
import Rocks from "../components/obstacles/Rocks";
import Coins from "../components/obstacles/Coins";
import Pounds from "../components/obstacles/Pounds";
import { v4  } from "uuid";

export const RandomMinMax = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const ObstacleList = (start,end,name) => {
  // console.log({start,end,name});
  const obstacle = [Coins,Rocks,Pounds]
   const t = Array(3)
    .fill(0)
    .map(() => ({
      side: !!randInt(0, 1) ? -1 : 1,
      Obstacle: obstacle[randInt(0, 2)],
      posZ: randInt(end,start),
      uuid: v4()
    }));
    // console.log('g',t);
    return t
};

export const GetForwardTranslation = (ref, speed, rem) => {
  const refObject = ref.current;
  const cT = refObject.translation();
  return vec3({ x: rem?.x || cT.x, y: rem?.y || cT.y, z: cT.z + speed });
};

export const GetDownwardTranslation = (ref, rem) => {
  const refObject = ref.current;
  const cT = refObject.translation();
  return vec3({ x: cT.x, y: rem?.y || cT.y, z: cT.z });
};

export const ZeroPad = (num, places) => String(num).padStart(places, "0");

export const ObjectsPosition = {}

