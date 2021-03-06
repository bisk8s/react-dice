import React from 'react';
import * as THREE from 'three';
import { useConvexPolyhedron } from 'use-cannon';

import { D4Materials } from '../../utils/Material';
import { randomRotation } from '../../utils/RandomRotation';
import getDiceValue from '../../utils/DiceValue';

import GLOBALS from '../../utils/Globals';

export default function D4({ position, name, check }) {
  const radius = 1.5;
  const geometry = new THREE.TetrahedronGeometry(radius);

  const [ref] = useConvexPolyhedron(() => {
    return {
      mass: radius,
      args: geometry,
      rotation: randomRotation(),
      onCollide: () => {
        const diceValue = getDiceValue('D4', geometry, ref.current, 1);
        let dices = {};
        dices[name || 'D4'] = { D4: diceValue.toString() };
        GLOBALS.dices = { ...GLOBALS.dices, ...dices };

        check();
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
    uv[1].set(0.5, 1);
    uv[2].set(-0.3, 0);
  };

  // uv mapping
  geometry.faceVertexUvs[0].forEach(uvMapping);
  geometry.uvsNeedUpdate = true;

  return <mesh ref={ref} geometry={geometry} material={D4Materials} />;
}
