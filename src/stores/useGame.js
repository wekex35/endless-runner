import create  from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import React from "react";
import { PATH_DEFAULT_COUNT } from "../common/constants";

export default create(
  subscribeWithSelector((set) => {
    return {
      pathCount: PATH_DEFAULT_COUNT,
      isPathAdded: true,
      /**
       * Phases
       */
      phase: "ready",
      start: () => {
        set((state) => {
          return state.phase == "ready"
            ? {
                phase: "playing",
              }
            : {};
        });
      },
      restart: () => {
        set((state) => {
          return state.phase == "playing" || state.phase == "ended"
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
      addPath: () => {
        console.log("addPat");
        set((state) => {
          return {
            pathCount: state.pathCount + 1,
            isPathAdded: false
          };
        });
      },
      pathAdded: () => {
        console.log("addPat");
        set((state) => {
          return {
            isPathAdded: true
          };
        });
      },
    };
  })
);
