import React from 'react'
import { useBox } from 'use-cannon'
import { Box } from '@react-three/drei'

export default function D6(props) {
  const size=2
  const [ref] = useBox(() => ({ mass: 1,
    args: [size, size, size],
     ...props }))
  
  return (
    <Box ref={ref} args={[size,size,size]} castShadow receiveShadow>
      <meshBasicMaterial attach="material" color="grey"/>
    </Box>
  )
}

