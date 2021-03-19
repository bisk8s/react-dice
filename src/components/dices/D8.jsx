import React from 'react';
import * as THREE from 'three';
import { useConvexPolyhedron } from 'use-cannon';
import { Octahedron } from '@react-three/drei'


export default function D8 (props) {
  const radius = 1;
  const octahedronGeometry = new THREE.OctahedronGeometry(radius);
  const [ref] = useConvexPolyhedron(() => {
    return {
      args: octahedronGeometry,
      mass: 1,
      ...props,
    };
  });

  return (
    <Octahedron args={radius} ref={ref}>
      <meshNormalMaterial attach="material" />
    </Octahedron>
  );
};