import React from 'react';
import * as THREE from 'three';
import { useConvexPolyhedron } from 'use-cannon';
import { D20Materials } from '../../utils/Material';
import { randomRotation } from '../../utils/RandomRotation';
import getDiceValue from '../../utils/DiceValue';

export default function D4() {
  const radius = 1.5;
  const geometry = new THREE.TetrahedronGeometry(radius);
  const [ref] = useConvexPolyhedron(() => {
    return {
      mass: radius,
      args: geometry,
      mrotation: randomRotation(),
      onCollide: () => {
        const diceValue = getDiceValue('D4', geometry, ref.current, 1);
        console.log(diceValue);
      },
    };
  });

  return (
    <mesh ref={ref} geometry={geometry} material={D20Materials.slice(1)} />
  );
}
