import React from 'react';
import { useBox } from 'use-cannon';
import { Box } from '@react-three/drei';
import { D20Materials } from '../../utils/Material';
import { randomRotation } from '../../utils/RandomRotation';

export default function D6(props) {
  const size = 2;
  const [ref] = useBox(() => ({
    mass: 1,
    args: [size, size, size],
    rotation: randomRotation(),
    ...props,
  }));

  return (
    <Box
      ref={ref}
      args={[size, size, size]}
      castShadow
      receiveShadow
      material={D20Materials.slice(2, 8)}
    />
  );
}
