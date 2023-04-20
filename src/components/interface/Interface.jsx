import { useKeyboardControls } from "@react-three/drei";
import React from "react";
import Playing from "./Playing";
import Finished from "./Finished";
import useGame from "../../stores/useGame";
import Ready from "./Ready";

function Interface() {

  const phase = useGame((state) => state.phase);
  if (phase == "ready") {
    return <Ready />;
  } else if (phase == "ended") {
    return <Finished />;
  } else {
    return <Playing />;
  }
}

export default Interface;
