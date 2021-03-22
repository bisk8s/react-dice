import React from 'react';
import * as THREE from 'three';
import { useConvexPolyhedron } from 'use-cannon';
import { Tetrahedron } from '@react-three/drei';
import { createDiceMaterials, standartD20Labels } from '../../utils/Material';

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

  const material = createDiceMaterials(standartD20Labels, 50, 1);

  return (
    <Tetrahedron ref={ref} args={radius} castShadow receiveShadow>
      <meshPhongMaterial attach="material" args={material} />
    </Tetrahedron>
  );
}
