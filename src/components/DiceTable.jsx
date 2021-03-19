import React from 'react';
import { Canvas } from 'react-three-fiber';
import { Physics } from 'use-cannon';

import { D4, D6 }  from './dices'; 
import Plane from './Plane';


export default function DiceTable() {
  return (
    <Canvas shadowMap sRGB gl={{ alpha: false }} camera={{ position: [-1, 2, 5], fov: 50 }}>
    <color attach="background" args={['#0f0']} />
    <hemisphereLight intensity={0.35} />
    <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={2} castShadow />
    <Physics>
      <Plane />
      <D4 position={[0, 10, -2]} />
      <D6 position={[0, 20, -2]} />
      <D6 position={[0, 30, -2]} />
    </Physics>
  </Canvas>
  );
}
