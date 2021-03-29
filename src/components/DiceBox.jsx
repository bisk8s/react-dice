import React, { useRef, useState } from 'react';
import { Canvas, useResource } from 'react-three-fiber';
import { Physics } from 'use-cannon';

import { MapControls, PerspectiveCamera } from '@react-three/drei';

import { D4, D6, D8, D10, D12, D20, V10, H10 } from './dices';

import Box from './Box';
import parseNotation from '../utils/DiceNotation';
import Controls from './Controls';
import GLOBALS from '../utils/Globals';

export default function DiceBox() {
  const sceneCamera = useResource();

  const initialNotation = [
    '1d4',
    '1d6',
    '1d8',
    '1d10',
    '1d12',
    '1d20',
    '1v10',
    '1h10',
  ].join(' ');
  const [dices, setDices] = useState([]);
  const input = useRef();

  const roll = () => {
    GLOBALS.dices = {};
    let result = parseNotation(input.current.value);
    setDices(result);
  };

  const check = () => {
    console.log(GLOBALS);
  };

  const onEnterPress = (e) => e.code === 'Enter' && roll();

  return (
    <>
      <Canvas>
        <PerspectiveCamera
          ref={sceneCamera}
          makeDefault
          position={[0, 40, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        />
        <MapControls camera={sceneCamera.current} />
        <hemisphereLight intensity={0.35} />
        <spotLight
          position={[0, 100, 10]}
          rotation={[-Math.PI / 2, 0, 0]}
          penumbra={1}
          intensity={1}
        />
        <Physics>
          <Box position={[0, 0, 0]} />

          {dices.map((type, key) => {
            const _key = type + key + Date.now();
            const position = [0, 40, 0];
            switch (type) {
              case 'D4':
                return <D4 key={_key} position={position} name={_key} />;
              case 'D6':
                return <D6 key={_key} position={position} name={_key} />;
              case 'D8':
                return <D8 key={_key} position={position} name={_key} />;
              case 'D10':
                return <D10 key={_key} position={position} name={_key} />;
              case 'D12':
                return <D12 key={_key} position={position} name={_key} />;
              case 'D20':
                return <D20 key={_key} position={position} name={_key} />;
              case 'V10':
                return <V10 key={_key} position={position} name={_key} />;
              case 'H10':
                return <H10 key={_key} position={position} name={_key} />;
              default:
                return null;
            }
          })}
        </Physics>
      </Canvas>
      <Controls>
        <input
          ref={input}
          type={'text'}
          defaultValue={initialNotation}
          onKeyDown={onEnterPress}
        />
        <button onClick={roll}>Roll!</button>
        <button onClick={check}>Check</button>
      </Controls>
    </>
  );
}
