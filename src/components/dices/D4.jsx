import React, { useState } from 'react'
import * as THREE from 'three'
import { useConvexPolyhedron } from 'use-cannon'


export default function D4(props) {
  const [hovered, setHover] = useState(false);
  

  const radius = 1
  const tetrahedronGeometry = new THREE.TetrahedronGeometry(radius)
  const [ref, api] = useConvexPolyhedron(() => {
    return {
      args: tetrahedronGeometry,
      mass: 1,
      ...props
    }
  })
  
  
  return (
    <mesh ref={ref}
      receiveShadow  
      castShadow 
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      >
      <tetrahedronGeometry attach="geometry" />
      <meshLambertMaterial attach="material" color={hovered ? '#D00' : '#EEE'} />
    </mesh>
  )
}

