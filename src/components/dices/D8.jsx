import React from 'react';
import * as THREE from 'three';
import { useConvexPolyhedron } from 'use-cannon';
import getDiceValue from '../../utils/DiceValue';
import { randomRotation } from '../../utils/RandomRotation';
import { D20Materials } from '../../utils/Material';

export default function D8() {
  const radius = 1;
  const geometry = new THREE.OctahedronGeometry(radius);
  const [ref] = useConvexPolyhedron(() => {
    return {
      mass: radius,
      args: geometry,
      rotation: randomRotation(),
      onCollide: () => {
        const diceValue = getDiceValue('D6', geometry, ref.current, 1);
        console.log(diceValue);
      },
    };
  });

  geometry.faces.forEach((face, i, arr) => {
    let materialIndex = i;

    console.log({ i, materialIndex });
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
