import React from "react";
import useGame from "../../stores/useGame";
import { ZeroPad } from "../../common/utils";

export default function Finished() {
  const score = useGame((state) => state.score);
  const coins = useGame((state) => state.coins);
  const start = useGame((state) => state.start);
  const handleStart = () => {
    start()
  }
  return (
    <div className="ended">
      <div className="score-board">
        <div className="score-title">Score</div>
        <div className="score-score">{ZeroPad(score, 4)}</div>
        <div className="score-coins">{ZeroPad(coins, 2)}</div>
        <div className="score-start" onClick={handleStart}></div>
      </div>
    </div>
  );
}
