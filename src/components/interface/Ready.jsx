import React from "react";
import useGame from "../../stores/useGame";

export default function Ready() {
  const start = useGame((state) => state.start);
  const handleStart = () => {
    start();
  };

  return (
    <div className="ready" onClick={handleStart}>
      <div className="text">Tap To Start</div>
    </div>
  );
}
