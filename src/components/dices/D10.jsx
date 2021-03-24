import React from 'react';
import * as THREE from 'three';
import { useConvexPolyhedron } from 'use-cannon';
import { D20Materials } from '../../utils/Material';
import { randomRotation } from '../../utils/RandomRotation';
import getDiceValue from '../../utils/DiceValue';

export default function D10() {
  const sides = 10;
  const radius = 1.5;
  const vertices = [
    [0, 0, 1],
    [0, 0, -1],
  ].flat();

  for (let i = 0; i < sides; ++i) {
    const b = (i * Math.PI * 2) / sides;
    vertices.push(-Math.cos(b), -Math.sin(b), 0.105 * (i % 2 ? 1 : -1));
  }

  const faces = [
    [0, 2, 3],
    [0, 3, 4],
    [0, 4, 5],
    [0, 5, 6],
    [0, 6, 7],
    [0, 7, 8],
    [0, 8, 9],
    [0, 9, 10],
    [0, 10, 11],
    [0, 11, 2],
    [1, 3, 2],
    [1, 4, 3],
    [1, 5, 4],
    [1, 6, 5],
    [1, 7, 6],
    [1, 8, 7],
    [1, 9, 8],
    [1, 10, 9],
    [1, 11, 10],
    [1, 2, 11],
  ].flat();

  const args = [vertices, faces, radius, 0];
  const geometry = new THREE.PolyhedronGeometry(...args);

  const [ref] = useConvexPolyhedron(() => {
    return {
      mass: radius,
      args: geometry,
      rotation: randomRotation(),
      onCollide: () => {
        const diceValue = getDiceValue('D6', geometry, ref.current);
        console.log(diceValue);
      },
    };
  });

  geometry.faces.forEach((face, i, arr) => {
    let materialIndex = Math.ceil(10 * ((i + 1) / arr.length)) - 1;
    if (i < 11 && i % 2 !== 0) {
      materialIndex += 1;
    }
    if (i === 9) {
      materialIndex = 0;
    }
    face.materialIndex = materialIndex;
  });

  const uvMapping = (uv, i) => {
    const isEven = i % 2 === 0;
    uv[0].set(...(isEven ? [0.5, 0] : [0, 0.25]));
    uv[1].set(...(isEven ? [1, 0.25] : [0.5, 0]));
    uv[2].set(...(isEven ? [0.5, 1] : [0.5, 1]));
  };

  // uv mapping
  geometry.faceVertexUvs[0].forEach(uvMapping);
  geometry.uvsNeedUpdate = true;

  return <mesh ref={ref} geometry={geometry} material={D20Materials} />;
}
