import { useFrame, useThree } from "@react-three/fiber";
import {
  BallCollider,
  CuboidCollider,
  RigidBody,
  vec3,
} from "@react-three/rapier";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { PATH_LENGTH, PATH_WIDTH, RS } from "../common/constants";
import {
  useAnimations,
  useFBX,
  useGLTF,
  useKeyboardControls,
} from "@react-three/drei";
import {
  createUseGesture,
  dragAction,
  pinchAction,
  useDrag,
  useGesture,
} from "@use-gesture/react";
import useGame from "../stores/useGame";
import { Jump, JumpLand } from "../common/Audio";

function Player() {
  const runModel = useFBX("./models/run.fbx");
  const [mixer] = useState(new THREE.AnimationMixer(runModel));
  const [canJump, setJump] = useState(true);
  const phase = useGame((state) => state.phase);
  const end = useGame((state) => state.end);
  const pause = useGame((state) => state.pause);
  const [subscribeKey, getKeys] = useKeyboardControls();
  const [getLeftRightArray, setLeftRightArray] = useState([]);
  const player = useRef();
  useFrame((state, delta) => {
    mixer.update(delta);
  });
  useEffect(() => {
    const action = mixer.clipAction(runModel.animations[0]);

    if (phase != "playing") {
      action.paused = true;
    } else {
      action.paused = false;
      action.play();
    }
  }, [phase]);

  const jump = () => {
    setJump(false);
    if (player.current.translation().y < 0.9) {
      Jump.currentTime = 0;
      Jump.play();
      const impulse = { x: 0, y: 3, z: 0 };
      player.current.applyImpulse(impulse);
    }
  };

  const moveLeft = () => {
    //console.log("jhjhjh");
    const { x, y, z } = player.current.translation();
    const toPosition = -(PATH_WIDTH - 1) / 3;
    let currentX = x;
    let currentY = y;
    const leftRightArray = [];
    while (currentX > toPosition) {
      const position = vec3({ x, y, z });
      currentX -= 0.3;
      currentY = currentX > 0 ? currentY + 0.1 : currentY - 0.1;
      position.x = currentX;
      // position.y = currentY < y ? y : currentY;
      position.x = currentX < 1 ? -1 : currentX;
      leftRightArray.push(position);
    }
    setLeftRightArray(leftRightArray);
  };

  const moveRight = () => {
    const { x, y, z } = player.current.translation();
    const toPosition = (PATH_WIDTH - 1) / 3;
    let currentX = x;
    let currentY = y;
    const leftRightArray = [];
    while (currentX < toPosition) {
      const position = vec3({ x, y, z });
      currentX += 0.3;
      currentY = currentX < 0 ? currentY + 0.1 : currentY - 0.1;
      position.x = currentX > 1 ? 1 : currentX;
      // position.y = currentY < y ? y : currentY;
      leftRightArray.push(position);
    }

    setLeftRightArray(leftRightArray);
  };

  useEffect(() => {
    if (phase == "pause") {
      return;
    }
    const unsubGame = useGame.subscribe(
      (state) => state.phase,
      (value) => {
        if (value == "ready") {
        }
      }
    );
    const unSubLeftward = subscribeKey(
      (state) => {
        return state.leftward;
      },
      (value) => {
        if (value) {
          moveLeft();
        }
      }
    );
    const unSubRightward = subscribeKey(
      (state) => {
        return state.rightward;
      },
      (value) => {
        if (value && getLeftRightArray.length === 0) {
          moveRight();
        }
      }
    );
    const unSubJump = subscribeKey(
      (state) => {
        return state.jump || state.forward;
      },
      (value) => {
        if (value) {
          jump();
        }
      }
    );

    const unSubAny = subscribeKey(() => {});
    return () => {
      unSubAny();
      unsubGame();
      unSubRightward();
      unSubLeftward();
      unSubJump();
    };
  }, [phase]);

  const [smoothCameraPosition] = useState(() => new THREE.Vector3(10, 10, 10));
  const [smoothTargetPosition] = useState(() => new THREE.Vector3());

  const playerController = (delta) => {
    if (getLeftRightArray.length > 0 && player.current) {
      player.current.setTranslation(getLeftRightArray.shift(), true);
    }
  };

  const cameraMovement = (state, delta) => {
    // Camera
    const playerPosition = player.current.translation();
    const cameraPosition = new THREE.Vector3();
    cameraPosition.copy(playerPosition);
    cameraPosition.z += 2.25;
    cameraPosition.y += 0.7;
    // cameraPosition.x -= playerPosition.x

    const cameraTarget = new THREE.Vector3();
    cameraTarget.copy(playerPosition);
    cameraTarget.y += 0.25;

    smoothCameraPosition.lerp(cameraPosition, 3 * delta);
    smoothTargetPosition.lerp(cameraTarget, 3 * delta);

    state.camera.position.copy(smoothCameraPosition);
    state.camera.lookAt(smoothTargetPosition);
  };
  useFrame((state, delta) => {
    if (!player.current.translation) return;
    // if (phase === "playing") {
    playerController(delta);
    cameraMovement(state, delta);
    // }

    const playerPosition = player.current.translation();
    if (playerPosition.y < 0) {
      end();
    }
  });

  const swipeOccurredRef = useRef({
    left: false,
    right: false,
    up: false,
    down: false,
  });
  const { viewport } = useThree();
  const bind = useGesture(
    {
      onDrag: ({ active, movement, direction, cancel }) => {
        // if (!swipeOccurredRef.current.left && x < -viewport.width / 2) {
        //   moveLeft();
        //   swipeOccurredRef.current.left = true;
        // } else if (!swipeOccurredRef.current.right && x > viewport.width / 2) {
        //   moveRight();
        //   swipeOccurredRef.current.right = true;
        // } else if (!swipeOccurredRef.current.up && y > viewport.height / 2) {
        //   jump();
        //   swipeOccurredRef.current.up = true;
        // } else if (!swipeOccurredRef.current.down && y < -viewport.height / 2) {
        //   // onSwipeDown();
        //   swipeOccurredRef.current.down = true;
        // }
      },
      onDragEnd: ({ active, movement, direction, cancel, tap }) => {
        const [mx, my] = movement;
        console.log({ tap });
        // if(!active) return
        console.log({ mx, my });
        if (mx > 8) {
          moveRight();
        } else if (mx < -8) {
          moveLeft();
        } else if (my < -3) {
          jump();
        }

        // //console.log(end);
        // swipeOccurredRef.current = {
        //   left: false,
        //   right: false,
        //   up: false,
        //   down: false,
        // };
      },
    },
    { target: window }
  );

  // return <div {...bind(arg)} />

  return (
    <RigidBody
      {...bind}
      ref={(t) => {
        player.current = t;
      }}
      ccd={true}
      position={[1.2, 2.45, 4]}
      rotation-y={Math.PI}
      colliders={false}
      lockRotations={true}
      onCollisionEnter={(payload) => {
        if (
          !canJump &&
          (payload.other.colliderObject.name === "pah1" ||
            payload.other.colliderObject.name === "path0")
        ) {
          JumpLand.currentTime = 0;
          JumpLand.play();
          setJump(true);
        }
        // if (payload.manifold.solverContactPoint(0).y > 0.5) {
        //   end();
        //   player.current = "";
        // }else{
        //
        // }
      }}
    >
      <primitive object={runModel} scale={RS} position-y={-75 * RS} />
      <CuboidCollider args={[40 * RS, 75 * RS, 50 * RS]} />
    </RigidBody>
  );
}
useFBX.preload("./models/run.fbx");
export default Player;
