import { PerspectiveCamera } from '@react-three/drei';
import React from 'react';
import { Canvas } from 'react-three-fiber';
import { Physics } from 'use-cannon';

import { D4, D6, D8, D10 } from './dices';
import Table from './Table';

export default function DiceTable() {
  return (
    <Canvas>
      {/* <color attach="background" args={['#0f0']} /> */}
      <PerspectiveCamera makeDefault position={[0, 0, 20]} />
      <hemisphereLight intensity={0.35} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.3}
        penumbra={1}
        intensity={2}
        castShadow
      />
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
