import React from 'react';
import * as THREE from 'three';
import { useConvexPolyhedron } from 'use-cannon';
import { Octahedron } from '@react-three/drei';
import { D20Materials } from '../../utils/Material';
import { randomRotation } from '../../utils/RandomRotation';

export default function D8(props) {
  const radius = 1.5;
  const octahedronGeometry = new THREE.OctahedronGeometry(radius);
  const [ref] = useConvexPolyhedron(() => {
    return {
      args: octahedronGeometry,
      mass: 2,
      rotation: randomRotation(),
      ...props,
    };
  });

  return (
    <Octahedron
      args={radius}
      ref={ref}
      castShadow
      receiveShadow
      material={D20Materials[2]}
    />
  );
}
