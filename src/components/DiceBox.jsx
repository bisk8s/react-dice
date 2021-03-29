import React, { useRef, useState } from 'react';
import { Canvas, useResource } from 'react-three-fiber';
import { Physics } from 'use-cannon';

import { MapControls, PerspectiveCamera } from '@react-three/drei';

import { D4, D6, D8, D10, D12, D20, V10, H10 } from './dices';

import _ from 'lodash';

import Box, { STAGE_H, STAGE_W } from './Box';
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
  const pre = useRef();

  const roll = () => {
    GLOBALS.dices = {};
    GLOBALS.type = {};
    GLOBALS.sum = {};
    let result = parseNotation(input.current.value);
    setDices(result);
  };

  const check = () => {
    pre.current.innerText = 'RESULTS: \n';
    _.forEach(GLOBALS.dices, (item, key) => {
      _.forEach(item, (value, name) => {
        pre.current.innerText += `${name}: ${value}`;
        if (_.isNaN(value * 2)) {
          GLOBALS.type[key] = { value };
        } else {
          GLOBALS.sum[key] = parseInt(value);
        }
      });
      pre.current.innerText += '\n';
    });
    pre.current.innerText += '\n';
    pre.current.innerText += 'Total: \n';
    pre.current.innerText += _.sum(_.map(GLOBALS.sum, (value) => value));
    pre.current.innerText += '\n';
    _.map(_.groupBy(GLOBALS.type, 'value'), (item, key) => {
      pre.current.innerText += `${key}: ${item.length} \n`;
    });
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

          {dices.map((type, index) => {
            const key = type + index + Date.now();
            const position = [
              STAGE_W * Math.random(),
              40,
              STAGE_H * Math.random(),
            ];
            const props = {
              key,
              position,
              name: key,
              check: () => check(),
            };
            switch (type) {
              case 'D4':
                return <D4 {...props} />;
              case 'D6':
                return <D6 {...props} />;
              case 'D8':
                return <D8 {...props} />;
              case 'D10':
                return <D10 {...props} />;
              case 'D12':
                return <D12 {...props} />;
              case 'D20':
                return <D20 {...props} />;
              case 'V10':
                return <V10 {...props} />;
              case 'H10':
                return <H10 {...props} />;
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
        <pre ref={pre}></pre>
      </Controls>
    </>
  );
}
