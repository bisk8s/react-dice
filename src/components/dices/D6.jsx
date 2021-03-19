import React, { useState } from 'react'
import { useBox } from 'use-cannon'

export default function D6(props) {
  const [ref] = useBox(() => ({ mass: 1, position: [0, 5, 0], rotation: [0.4, 0.2, 0.5], ...props }))
  
  const [hovered, setHover] = useState(false);
  
  return (
    <mesh ref={ref}
      receiveShadow  
      castShadow 
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      >
      <boxBufferGeometry attach="geometry" />
      <meshLambertMaterial attach="material" color={hovered ? '#D00' : '#EEE'} />
    </mesh>
  )
}

