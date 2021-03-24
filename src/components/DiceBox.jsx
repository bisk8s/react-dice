import React, { useState } from 'react';
import { Canvas, useResource } from 'react-three-fiber';
import { Physics } from 'use-cannon';

import { MapControls, PerspectiveCamera } from '@react-three/drei';

import { D4, D6, D8, D10, D12, D20 } from './dices';

import Box from './Box';
import parseNotation from '../utils/DiceNotation';

export default function DiceBox() {
  const sceneCamera = useResource();

  const [notation, setNotation] = useState(
    '1d4 + 1d6 + 1d8 + 1d10 + 1d12 + 1d20'
  );
  const [dices, setDices] = useState([]);

  const roll = () => {
    let notationObj = parseNotation(notation);
    setDices(notationObj.set);
  };

  const onTextChange = ({ target: { value } }) => {
    const upper = value.toUpperCase();
    const matches = upper.match(/([0-9]+[D][0-9]+)/gi) || [];
    const notation = matches.join(' + ');
    setNotation(notation);
  };

  const onEnterPress = (e) => e.code === 'Enter' && roll();

  return (
    <>
      <div>
        <input
          type={'text'}
          defaultValue={notation}
          onChange={onTextChange}
          onKeyDown={onEnterPress}
        />
        <button onClick={roll}>Roll!</button>
      </div>
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
                return <D4 key={_key} position={position} />;
              case 'D6':
                return <D6 key={_key} position={position} />;
              case 'D8':
                return <D8 key={_key} position={position} />;
              case 'D10':
                return <D10 key={_key} position={position} />;
              case 'D12':
                return <D12 key={_key} position={position} />;
              case 'D20':
                return <D20 key={_key} position={position} />;
              default:
                return null;
            }
          })}
        </Physics>
      </Canvas>
    </>
  );
}
