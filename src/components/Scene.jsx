import { RapierRigidBody, RigidBody, quat, vec3 } from "@react-three/rapier";
import { useEffect } from "react";
import { useRef } from "react";


export default  function Scene() {
  const rigidBody = useRef();

  useEffect(() => {
    if (rigidBody.current) {
      const position = vec3(rigidBody.current.translation());
      const quaternion = quat(rigidBody.current.rotation());
    //   const eulerRot = new Euler().setFromQuaternion(
    //     quat(rigidBody.current.rotation())
    //   );

      // While Rapier's return types need conversion, setting values can be done directly with Three.js types
      rigidBody.current.setTranslation(position, true);
      rigidBody.current.setRotation(quaternion, true);
    //   rigidBody.current.setAngVel({ x: 0, y: 2, z: 0 }, true);
    }
  }, []);

  return (
    <RigidBody ref={rigidBody}>
      <mesh>
        <boxBufferGeometry />
        <meshStandardMaterial />
      </mesh>
    </RigidBody>
  );
};
