import React from 'react';
import { useConvexPolyhedron } from 'use-cannon';
import { Polyhedron } from '@react-three/drei';

import { D20Materials } from '../../utils/Material';
import { geometryD10 } from '../../utils/Geometry';
// import { randomRotation } from '../../utils/RandomRotation';

export default function D10(props) {
  const radius = 1.5;
  const [geometry, args] = geometryD10(radius);

  const [ref] = useConvexPolyhedron(() => {
    return {
      args: geometry,
      mass: 1,
      // rotation: randomRotation(),
      ...props,
    };
  });

  return (
    <Polyhedron
      args={args}
      geometry={geometry}
      ref={ref}
      castShadow
      receiveShadow
      material={D20Materials}
    />
  );
}
