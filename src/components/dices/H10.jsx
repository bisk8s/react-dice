import React from 'react';
import * as THREE from 'three';
import { useConvexPolyhedron } from 'use-cannon';
import { H10Materials } from '../../utils/Material';
import { randomRotation } from '../../utils/RandomRotation';
// import getDiceValue from '../../utils/DiceValue';

export default function H10({ position }) {
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
        // const diceValue = getDiceValue('D10', geometry, ref.current);
        // console.log(diceValue);
      },
      position,
    };
  });

  geometry.faces.forEach((face, i) => {
    switch (true) {
      case [9, 0].lastIndexOf(i) >= 0:
        // crit
        face.materialIndex = 2;
        break;
      case [14, 15].lastIndexOf(i) >= 0:
        // beast
        face.materialIndex = 3;
        break;
      case [
        [3, 4],
        [7, 8],
        [12, 13],
        [18, 19],
      ]
        .flat()
        .lastIndexOf(i) >= 0:
        // success
        face.materialIndex = 1;
        break;
      default:
        face.materialIndex = 0;
        break;
    }
  });

  const uvMapping = (uv, i) => {
    const isEven = i % 2 === 0;
    const a = [0.5, 0];
    const b = [0, 0.25];
    const c = [0.5, 1.25];
    const d = [1, 0.25];

    uv[0].set(...(isEven ? a : b));
    uv[1].set(...(isEven ? d : a));
    uv[2].set(...c);
  };

  // uv mapping
  geometry.faceVertexUvs[0].forEach(uvMapping);
  geometry.uvsNeedUpdate = true;

  return <mesh ref={ref} geometry={geometry} material={H10Materials} />;
}
