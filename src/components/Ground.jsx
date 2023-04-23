import React from 'react'
import { PATH_LENGTH, PATH_SPAWN_OFFSET } from '../common/constants'

export default function Ground() {
  return (
    <mesh rotation-x={-Math.PI/2} position={[0,-0.3,-PATH_LENGTH+PATH_SPAWN_OFFSET]}>
        <planeGeometry args={[PATH_LENGTH,2*PATH_LENGTH+PATH_LENGTH/2]} />
        <meshStandardMaterial color={'greenyellow'}/>
    </mesh>
  )
}
