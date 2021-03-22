import React from 'react';
import * as THREE from 'three';
import { useConvexPolyhedron } from 'use-cannon';
import { Dodecahedron } from '@react-three/drei';
import { D20Materials } from '../../utils/Material';

export default function D12(props) {
  const radius = 1;
  const dodecahedronGeometry = new THREE.DodecahedronGeometry(radius);
  const [ref] = useConvexPolyhedron(() => {
    return {
      args: dodecahedronGeometry,
      mass: 1,
      ...props,
    };
  });

  return (
    <Dodecahedron
      args={radius}
      ref={ref}
      castShadow
      receiveShadow
      material={D20Materials[0]}
    />
  );
}
