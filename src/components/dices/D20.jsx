import React from 'react';
import * as THREE from 'three';
import { useConvexPolyhedron } from 'use-cannon';
import { D20Materials } from '../../utils/Material';
import { randomRotation } from '../../utils/RandomRotation';
import getDiceValue from '../../utils/DiceValue';
import GLOBALS from '../../utils/Globals';

export default function D20({ position, name }) {
  const radius = 1.6;
  const geometry = new THREE.IcosahedronGeometry(radius);
  const [ref] = useConvexPolyhedron(() => {
    return {
      mass: radius,
      args: geometry,
      rotation: randomRotation(),
      onCollide: () => {
        const diceValue = getDiceValue('D20', geometry, ref.current, 1);
        let dices = {};
        dices[name || 'D20'] = { D20: diceValue.toString() };
        GLOBALS.dices = { ...GLOBALS.dices, ...dices };
      },
      position,
    };
  });

  geometry.faces.forEach((face, i) => {
    let materialIndex = i;
    face.materialIndex = materialIndex;
  });

  const uvMapping = (uv, i) => {
    uv[0].set(1.33, 0);
    uv[1].set(0.33, 1.33);
    uv[2].set(0, 0);
  };

  // uv mapping
  geometry.faceVertexUvs[0].forEach(uvMapping);
  geometry.uvsNeedUpdate = true;

  return (
    <mesh ref={ref} geometry={geometry} material={D20Materials.slice(1)} />
  );
}
