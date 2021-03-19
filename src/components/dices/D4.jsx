import React from 'react';
import * as THREE from 'three';
import { useConvexPolyhedron } from 'use-cannon';
import { Tetrahedron } from '@react-three/drei';

export default function D4(props) {
  const radius = 1.5;
  const tetrahedronGeometry = new THREE.TetrahedronGeometry(radius);
  const [ref] = useConvexPolyhedron(() => {
    return {
      args: tetrahedronGeometry,
      mass: 1,
      ...props,
    };
  });

  return (
    <Tetrahedron ref={ref} args={radius} castShadow receiveShadow>
      <meshBasicMaterial attach="material" color="grey" />
    </Tetrahedron>
  );
}
