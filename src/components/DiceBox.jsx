import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import React from 'react';
import { Canvas, useResource } from 'react-three-fiber';
import { Physics } from 'use-cannon';

// import { D4, D6, D8, D10, D12, D20 } from './dices';
import { D10 } from './dices';
import Box from './Box';

export default function DiceBox() {
  const sceneCamera = useResource();

  return (
    <Canvas>
      <PerspectiveCamera
        ref={sceneCamera}
        makeDefault
        position={[0, 10, 25]}
        rotation={[-0.3, 0, 0]}
      />
      <OrbitControls camera={sceneCamera.current} />
      <hemisphereLight intensity={0.35} castShadow />
      <spotLight
        position={[0, 100, 10]}
        angle={0.3}
        penumbra={1}
        intensity={1}
        castShadow
      />
      <Physics>
        <Box position={[0, 0, 0]} />

        {/* <D4 position={[-15, 10, 0]} /> */}
        {/* <D6 position={[-10, 10, 0]} /> */}
        {/* <D8 position={[-5, 10, 0]} /> */}
        <D10 position={[0, 10, 0]} />
        {/* <D12 position={[10, 10, 0]} /> */}
        {/* <D20 position={[15, 10, 0]} /> */}
      </Physics>
    </Canvas>
  );
}
