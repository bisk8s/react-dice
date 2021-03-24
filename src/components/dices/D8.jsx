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

  return (
    <mesh ref={ref} geometry={geometry} material={D20Materials.slice(1)} />
  );
}
