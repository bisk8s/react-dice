import React from 'react';
import { usePlane } from 'use-cannon';
import { Plane } from '@react-three/drei'


export default function Table(props) {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }))
  return (
    <Plane ref={ref} args={[800, 480]} receiveShadow>
      <meshBasicMaterial attach="material" color="pink"/>
    </Plane>
  )
}
