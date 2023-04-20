import React from "react";
import useGame from "../../stores/useGame";
import { ZeroPad } from "../../common/utils";

function Playing() {
  const phase = useGame((state) => state.phase);
  const pause = useGame((state) => state.pause);
  const resume = useGame((state) => state.resume);
  const score = useGame((state) => state.score);
  const coins = useGame((state) => state.coins);
  const handlerPause = () => {
    pause();
  };

  const handleResume = () => {
    resume();
  };

  return (
    <div className="interface">
      <div>
        {phase == "playing" ? (
          <img
            onClick={handlerPause}
            className="pause"
            src="https://amihungry.com/wp-content/uploads/2020/04/pause-button-square-300x300.png"
          />
        ) : null}
      </div>
      <div className="score">{ZeroPad(score, 4)}</div>
      <div className="coins">{ZeroPad(coins, 2)}</div>
      {phase == "pause" ? (
        <div className="resume" onClick={handleResume}>
          RESUME
        </div>
      ) : null}
    </div>
  );
}

export default Playing;
