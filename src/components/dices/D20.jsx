import React from 'react';
import * as THREE from 'three';
import { useConvexPolyhedron } from 'use-cannon';
import { Icosahedron } from '@react-three/drei';
import { D20Materials } from '../../utils/Material';

export default function D12(props) {
  const radius = 1;
  const icosahedronGeometry = new THREE.IcosahedronGeometry(radius);
  const [ref] = useConvexPolyhedron(() => {
    return {
      args: icosahedronGeometry,
      mass: 1,
      ...props,
    };
  });

  return (
    <Icosahedron
      args={radius}
      ref={ref}
      castShadow
      receiveShadowmaterial={D20Materials[0]}
    />
  );
}
