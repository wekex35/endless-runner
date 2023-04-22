import { Environment, OrbitControls } from "@react-three/drei";

import React, { useState } from "react";
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

export default function Game() {
  const phase = useGame((state) => state.phase);
  useFrame((state, delta) => {
    if (phase == "playing") {
      if (!state.clock.running) state.clock.start();
    } else {
      state.clock.stop();
    }
  });

  return (
    <>
      <Physics debug>
        <Perf position="bottom-left" />
        <Lights />
        <OrbitControls />
        <Path />
        <Player />
        {/* <Coins /> */}
   
       <Handler/>
      </Physics>
    </>
  );
}
