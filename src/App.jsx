import { KeyboardControls } from "@react-three/drei";

import Game from "./Game";
import { Canvas } from "@react-three/fiber";
import Interface from "./components/interface/Interface";
import useGame from "./stores/useGame";
import { useEffect, useState } from "react";

function App() {
  const phase = useGame((state) => state.phase);
  const [state, setState] = useState(true);
  useEffect(() => {
    console.log(phase);
    if (phase == "ended") {
      setState(false);
      setInterval(() => { setState(true);}, 5000);
    }
  }, [phase]);
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
          far: 200,
          position: [2.5, 4, 6],
        }}
      >
        {state ? <Game /> : <></>}
      </Canvas>
      <Interface />
    </KeyboardControls>
  );
}

export default App;
