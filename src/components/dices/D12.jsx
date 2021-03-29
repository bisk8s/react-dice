import React from 'react';
import * as THREE from 'three';
import { useConvexPolyhedron } from 'use-cannon';
import { D20Materials } from '../../utils/Material';
import { randomRotation } from '../../utils/RandomRotation';
import getDiceValue from '../../utils/DiceValue';
import GLOBALS from '../../utils/Globals';

export default function D12({ position, name }) {
  const radius = 1.5;
  const geometry = new THREE.DodecahedronGeometry(radius);
  const [ref] = useConvexPolyhedron(() => {
    return {
      mass: radius,
      args: geometry,
      rotation: randomRotation(),
      onCollide: () => {
        const diceValue = getDiceValue('D12', geometry, ref.current, 1);
        let dices = {};
        dices[name || 'D12'] = { D12: diceValue.toString() };
        GLOBALS.dices = { ...GLOBALS.dices, ...dices };
      },
      position,
    };
  });

  geometry.faces.forEach((face, i, arr) => {
    let materialIndex = Math.ceil(12 * ((i + 1) / arr.length)) - 1;
    face.materialIndex = materialIndex;
  });

  const uvMapping = (uv, i) => {
    const type = i % 3;
    // point map
    const a = [0.5, 0.95];
    const b = [0.05, 0.66];
    const c = [0.95, 0.66];
    const d = [0.2, 0.09];
    const e = [0.8, 0.09];
    /*
      Image explanation
           A
          ,'.
      B ,'   `. C
        \     /
         \___/
         D   E
      
      reference: https://threejs.org/docs/#api/en/geometries/DodecahedronGeometry
    */
    uv[0].set(...[a, b, d][type]);
    uv[1].set(...[b, d, e][type]);
    uv[2].set(...c);
  };

  // uv mapping
  geometry.faceVertexUvs[0].forEach(uvMapping);
  geometry.uvsNeedUpdate = true;

  return (
    <mesh ref={ref} geometry={geometry} material={D20Materials.slice(1)} />
  );
}
