import React from 'react';
import { Canvas } from 'react-three-fiber';
import { Physics } from 'use-cannon';

import { D4, D6, D8, D10 }  from './dices'; 
import Table from './Table';

export default function DiceTable() {
  const camera = { position: [0, 10, 20], fov: 50 }
  return (
    <Canvas shadowMap sRGB gl={{ alpha: false }} camera={camera}>
    <color attach="background" args={['#0f0']} />
    <hemisphereLight intensity={0.35} />
    <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={2} castShadow />
    <Physics>
      <Table position={[0, -5, 0]} />
      <D4 position={[-5, 10, -2]} />
      <D6 position={[0, 10, -2]} />
      <D8 position={[5, 10, -2]} />
      <D10 position={[10, 10, -2]} />
    </Physics>
  </Canvas>
  );
}
