import React from 'react';
import * as THREE from 'three';
import { useBox } from 'use-cannon';
import getDiceValue from '../../utils/DiceValue';
import { D20Materials } from '../../utils/Material';
import { randomRotation } from '../../utils/RandomRotation';

export default function D6() {
  const size = 2;
  const geometry = new THREE.BoxGeometry(size, size, size);

  const [ref] = useBox(() => ({
    mass: size,
    args: [size, size, size],
    rotation: randomRotation(),
    onCollide: () => {
      const diceValue = getDiceValue('D6', geometry, ref.current, 1);
      console.log(diceValue);
    },
  }));

  return (
    <mesh ref={ref} geometry={geometry} material={D20Materials.slice(1)} />
  );
}
