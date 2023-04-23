import { useFBX, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RigidBody, quat, vec3 } from "@react-three/rapier";
import React from "react";
import { useRef } from "react";
import { PATH_LENGTH, SPEED } from "../../common/constants";
import { v4 as uuidv4 } from "uuid";
import { randInt } from "three/src/math/MathUtils";
import {
  GetDownwardTranslation,
  GetForwardTranslation,
  ObjectsPosition,
} from "../../common/utils";
import useGame from "../../stores/useGame";
import { CoinSound } from "../../common/Audio";

const Coin = ({ coinModel, position = [0, 0, 0], ...props }) => {
  const coinRef = useRef();
  const addCoins = useGame((state) => state.addCoins);
  useFrame((state, delta) => {
    const speed = delta * SPEED;
    const fT = GetForwardTranslation(coinRef, speed);
    coinRef.current.setTranslation(fT, true);

    if (props.index === 0) {
      ObjectsPosition[props.uuid] = fT;
      if (ObjectsPosition[props.uuid]?.z > 10) {
        delete ObjectsPosition[props.uuid];
      }
    }

    // if(ref.current.translation().z != fT.z){
    //   //console.log(props.pathName,props.uuid,fT);
    // }
  });

  return (
    <RigidBody
      ref={coinRef}
      position={position}
      type="fixed"
      visible={true}
      onCollisionEnter={(payload) => {
        coinRef.current.setTranslation(
          GetDownwardTranslation(coinRef, { y: -2 }),
          true
        );
        CoinSound.currentTime = 0
        CoinSound.play()
        addCoins();
      }}
    >
      <mesh
        geometry={coinModel.children[0].geometry}
        material={coinModel.children[0].material}
      />
    </RigidBody>
  );
};

//752
export default function Coins(props) {
  const coinList = [];
  for (let index = 0; index < PATH_LENGTH / 4; index += 2) {
    coinList.push(-index + props.position[2]);
  }
  const coinModel = useFBX("./models/coin.fbx");
  const xPos = props.side;
  return (
    <>
      {coinList.map((z, index) => {
        return (
          <Coin
            key={uuidv4()}
            uuid={props.uuid}
            index={index}
            coinModel={coinModel}
            position={[xPos, 1, z]}
          />
        );
      })}
    </>
  );
}
useFBX.preload("./models/coin.fbx");
