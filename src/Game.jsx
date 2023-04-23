import { Environment, OrbitControls, Sky } from "@react-three/drei";

import React, { useEffect, useState } from "react";
import Path from "./components/Path";
import { Light } from "three";
import Lights from "./components/Lights";
import Player from "./components/Player";
import { Physics } from "@react-three/rapier";
import Scene from "./components/Scene";
import useGame from "./stores/useGame";
import { Perf } from "r3f-perf";
import Coins from "./components/obstacles/Coins";
import ObjectTest from "./components/ObjectTest";
import Pounds from "./components/obstacles/Pounds";
import Rocks from "./components/obstacles/Rocks";
import { useFrame } from "@react-three/fiber";

import Handler from "./components/Handler";
import Ground from "./components/Ground";
import House from "./components/House";

export default function Game() {
  const phase = useGame((state) => state.phase);

  const [state, setState] = useState(true);
  useEffect(() => {
    console.log(phase);
    if (phase == "ended") {
      setState(false);
      setInterval(() => { setState(true);}, 5000);
    }
  }, [phase]);
  useFrame((state, delta) => {
    if (phase == "playing") {
      if (!state.clock.running) state.clock.start();
    } else {
      state.clock.stop();
    }
  });

  return (
    <>
   
      <Physics debug={false}>
        <Sky/>
        <Perf position="bottom-left" />
        <Lights />
        {/* <OrbitControls makeDefault/>  */}
        <House/>
       {state ? <>
        <Path />
        <Player />
        <Ground/>
       </> :<></>}
      

       {/* <Handler/> */}
      </Physics>
    </>
  );
}
