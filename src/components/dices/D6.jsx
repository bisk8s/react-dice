import React from 'react';
import * as THREE from 'three';
import { useBox } from 'use-cannon';
import { D20Materials } from '../../utils/Material';
import { randomRotation } from '../../utils/RandomRotation';
import getDiceValue from '../../utils/DiceValue';
import GLOBALS from '../../utils/Globals';

export default function D6({ position, name, check }) {
  const size = 2;
  const geometry = new THREE.BoxGeometry(size, size, size);

  const [ref] = useBox(() => ({
    mass: size,
    args: [size, size, size],
    rotation: randomRotation(),
    onCollide: () => {
      const diceValue = getDiceValue('D6', geometry, ref.current, 1);
      let dices = {};
      dices[name || 'D6'] = { D6: diceValue.toString() };
      GLOBALS.dices = { ...GLOBALS.dices, ...dices };

      check();
    },
    position,
  }));

  return (
    <mesh ref={ref} geometry={geometry} material={D20Materials.slice(1)} />
  );
}
