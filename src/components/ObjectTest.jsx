import { useGLTF } from '@react-three/drei'
import React from 'react'
import Adventure from './models/adventure';
import AdventurePack from './models/AdventurePack';

export default function ObjectTest() {
   const model = useGLTF('./models/low_poly_adventure_asset_pack.glb')
   return (
    <AdventurePack/>
  )
}
