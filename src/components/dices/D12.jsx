import React from 'react';
import * as THREE from 'three';
import { useConvexPolyhedron } from 'use-cannon';
import { Dodecahedron } from '@react-three/drei';

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
    <Dodecahedron args={radius} ref={ref}>
      <meshNormalMaterial attach="material" />
    </Dodecahedron>
  );
}
