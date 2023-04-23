import { KeyboardControls, Loader } from "@react-three/drei";

import Game from "./Game";
import { Canvas } from "@react-three/fiber";
import Interface from "./components/interface/Interface";
import useGame from "./stores/useGame";
import { Suspense, useEffect, useState } from "react";
import ObjectTest from "./components/ObjectTest";

function App() {
  return (
    <KeyboardControls
      map={[
        { name: "forward", keys: ["ArrowUp", "KeyW"] },
        { name: "backward", keys: ["ArrowDown", "KeyS"] },
        { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
        { name: "rightward", keys: ["ArrowRight", "KeyD"] },
        { name: "jump", keys: ["Space"] },
      ]}
    >
      <Canvas
        shadows
        camera={{
          fov: 45,
          near: 0.1,
          far: 40,
          position: [2.5, 4, -6],
        }}
      >
       
        <Suspense fallback={null}>
          <Game />
        </Suspense>
      </Canvas>
      <Loader />
      <Interface />
    </KeyboardControls>
  );
}

export default App;
