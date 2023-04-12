import { OrbitControls } from "@react-three/drei";

import React from "react";
import Path from "./components/Path";
import { Light } from "three";
import Lights from "./components/Lights";
import Player from "./components/Player";
import { Debug, Physics } from "@react-three/rapier";

export default function Game() {
  return (
    <>
      <Physics>
        {/* <OrbitControls /> */}
        <Debug/>
        <Lights />
        <Path />
        <Player />
      </Physics>
    </>
  );
}
