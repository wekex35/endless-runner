import create from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import React from "react";
import { PATH_DEFAULT_COUNT } from "../common/constants";

export default create(
  (set) => {
    return {
      pathCount: PATH_DEFAULT_COUNT,
      isPathAdded: true,
      /**
       * Phases
       */
      phase: "ready",
      //score
      score: 0,
      coins: 0,
      start: () => {
        set((state) => {
          return state.phase == "ready" || state.phase == "ended"
            ? {
                phase: "playing",
              }
            : {};
        });
      },
      restart: () => {
        set((state) => {
          return state.phase == "playing"
            ? {
                phase: "ready",
              }
            : {};
        });
      },
      end: () => {
        set((state) => {
          return state.phase == "playing"
            ? {
                phase: "ended",
              }
            : {};
        });
      },
      pause: () => {
      
        set((state) => {
          return state.phase == "playing" 
            ? {
                phase: "pause",
              }
            : {};
        });
      },
      resume: () => {
        set((state) => {
          return state.phase == "pause"
            ? {
                phase: "playing",
              }
            : {};
        });
      },
      addPath: () => {
        set((state) => {
          return {
            pathCount: state.pathCount + 1,
            isPathAdded: false,
          };
        });
      },
      pathAdded: () => {
        set((state) => {
          return {
            isPathAdded: true,
          };
        });
      },
    };
  })
;
