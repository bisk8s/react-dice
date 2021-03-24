import React from 'react';
import * as THREE from 'three';
import { useConvexPolyhedron } from 'use-cannon';
import { D20Materials } from '../../utils/Material';
import { randomRotation } from '../../utils/RandomRotation';
// import getDiceValue from '../../utils/DiceValue';

export default function D4({ position }) {
  const radius = 1.5;
  const geometry = new THREE.TetrahedronGeometry(radius);
  const [ref] = useConvexPolyhedron(() => {
    return {
      mass: radius,
      args: geometry,
      mrotation: randomRotation(),
      onCollide: () => {
        // const diceValue = getDiceValue('D4', geometry, ref.current, 1);
        // console.log(diceValue);
      },
      position,
    };
  });

  geometry.faces.forEach((face, i) => {
    let materialIndex = i;
    face.materialIndex = materialIndex;
  });

  const uvMapping = (uv, i) => {
    uv[0].set(1.3, 0);
    uv[1].set(0.33, 1.3);
    uv[2].set(0, 0);
  };

  // uv mapping
  geometry.faceVertexUvs[0].forEach(uvMapping);
  geometry.uvsNeedUpdate = true;

  return (
    <mesh ref={ref} geometry={geometry} material={D20Materials.slice(1)} />
  );
}
