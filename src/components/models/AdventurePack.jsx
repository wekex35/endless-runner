/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: ghostlyfail (https://sketchfab.com/ghostlyfail)
license: CC-BY-NC-4.0 (http://creativecommons.org/licenses/by-nc/4.0/)
source: https://sketchfab.com/3d-models/low-poly-adventure-asset-pack-bda2fd1158df425fb703f53d926b1ec6
title: Low Poly Adventure Asset Pack
*/

import React, { useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useControls } from "leva";

export default function AdventurePack(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(
    "./models/low_poly_adventure_asset_pack.glb"
  );

  const { actions } = useAnimations(animations, group);
  const options = [];
  const options2 = {};
  for (const node in nodes) {
    const nd = node.toString();

    if (nd.includes("#")) {
      const matNo = nd.split("#")[1].split("_")[0];
      const obj = {
        geo: nd,
        mat: `Material_${matNo}`,
      };
      options2[`${nd.split("#")[0].replace("_Material_", "")}`] = nd;
      options.push(nd);
    }
  }

  // const { name,scale } = useControls({
  //   name: {
  //     options: options,
  //   },
  //   scale : {
  //     value : 0.05,
  //     min : 0.01,
  //     max : 0.1,
  //   }
  // });
 const name = props.name
  const mat = `Material_${name.split("#")[1].split("_")[0]}`;
  return (
    <>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        scale={0.05}
        name={name}
        castShadow
        receiveShadow
        geometry={nodes[name].geometry}
        material={materials[mat]}
        {...props}
      />
    </>
  );
}

useGLTF.preload("./models/low_poly_adventure_asset_pack.glb");
export const AdventurePackObjects = {
  Bush: "Bush_Material_#22_0",
  Grass: "Grass_Material_#22_0",
  Tent: "Tent_Material_#155_0",
  PineTree_V1: "PineTree_V1_Material_#22_0",
  Maple_Tree: "Maple_Tree_Material_#45_0",
  Willow_Tree: "Willow_Tree_Material_#22_0",
  Pinetree_V2: "Pinetree_V2_Material_#22_0",
  Tree: "Tree_Material_#22_0",
  Trunk: "Trunk_Material_#68_0",
  House: "House_Material_#149_0",
  Lilie_Red: "Lilie_Red_Material_#150_0",
  Dandelion_Yellow: "Dandelion_Yellow_Material_#150_0",
  Tulip_Purple: "Tulip_Purple_Material_#150_0",
  Wild_Flower_Red: "Wild_Flower_Red_Material_#150_0",
  SnowDrop_Purple: "SnowDrop_Purple_Material_#150_0",
  SnowDrop_white: "SnowDrop_white_Material_#150_0",
  Dandelion_Purple: "Dandelion_Purple_Material_#150_0",
  Liliy_Purple: "Liliy_Purple_Material_#150_0",
  Tulip_Red: "Tulip_Red_Material_#150_0",
  Wild_flower_Yellow: "Wild_flower_Yellow_Material_#150_0",
  Liliy_White: "Liliy_White_Material_#150_0",
  Dandelion_White: "Dandelion_White_Material_#150_0",
  Fence: "Fence_Material_#149_0",
  Well: "Well_Material_#149_0",
  Table: "Table_Material_#151_0",
  Stool: "Stool_Material_#151_0",
  Rocks: "Rocks_Material_#116_0",
  Mushroom: "Mushroom_Material_#150_0",
  rock: "rock_Material_#116_0",
  Rock2: "Rock2_Material_#116_0",
  Crate: "Crate_Material_#149_0",
  Sign: "Sign_Material_#149_0",
  Barrel: "Barrel_Material_#102_0",
  Log: "Log_Material_#151_0",
  Mailbox: "Mailbox_Material_#149_0",
  Gate: "Gate_Material_#149_0",
  Woddenbridge: "Woddenbridge_Material_#117_0",
  Line042: "Line042_Material_#117_0",
  Tree1: "Tree1_Material_#22_0",
  Tree2: "Tree2_Material_#22_0",
  Tree4: "Tree4_Material_#22_0",
  PineTree_V3: "PineTree_V3_Material_#22_0",
  DeadTree1: "DeadTree1_Material_#149_0",
  DeadTree2: "DeadTree2_Material_#149_0",
  DeadTree3: "DeadTree3_Material_#149_0",
  DeadTree4: "DeadTree4_Material_#149_0",
  Path: "Path_Material_#116_0",
  Girl: "Girl_Material_#168_0",
  Guy: "Guy_Material_#169_0",
  Duck: "Duck_Material_#102_0",
  Pond_Rocks: "Pond_Rocks_Material_#116_0",
  bulrush: "bulrush_Material_#22_0",
  Pond: "Pond_Material_#149_0",
  Fire_Red001: "Fire_Red001_Material_#68_0",
  Fire_Orange: "Fire_Orange_Material_#68_0",
  Fire_Yellow: "Fire_Yellow_Material_#68_0",
  Fire_Red: "Fire_Red_Material_#68_0",
  Fire_Place: "Fire_Place_Material_#68_0",
  Lamp: "Lamp_Material_#117_0",
  Basicsword: "Basicsword_Material_#149_0",
  Shield: "Shield_Material_#149_0",
  Axe: "Axe_Material_#149_0",
  Bomb: "Bomb_Material_#149_0",
  Heart: "Heart_Material_#155_0",
  Sword: "Sword_Material_#149_0",
  RoundShield: "RoundShield_Material_#149_0",
};