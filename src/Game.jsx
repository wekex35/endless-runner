import { Environment, OrbitControls } from "@react-three/drei";

import React, { useState } from "react";
import Path from "./components/Path";
import { Light } from "three";
import Lights from "./components/Lights";
import Player from "./components/Player";
import {  Physics } from "@react-three/rapier";
import Scene from "./components/Scene";
import useGame from "./stores/useGame";

export default function Game() {
  const phase = useGame((state) => state.phase);
  return (
    <>
      <Physics debug>
        <Lights />
        <OrbitControls />
        <Path />
        <Player /> 
      </Physics>
    </>
  );
}
