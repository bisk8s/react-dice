import React from 'react';
import { Plane } from '@react-three/drei';
import { usePlane } from 'use-cannon';

export const STAGE_W = 1920 / 100;
export const STAGE_H = 1080 / 100;
const ANGLE = Math.PI / 2;

const SideShort = ({ ...props }) => {
  const [ref] = usePlane(() => ({ ...props }));
  return (
    <Plane ref={ref} args={[STAGE_H * 2, STAGE_H * 2]}>
      <meshBasicMaterial attach="material" color={'#000'} opacity={0} />
    </Plane>
  );
};

const SideWide = ({ ...props }) => {
  const [ref] = usePlane(() => ({ ...props }));
  return (
    <Plane ref={ref} args={[STAGE_W * 2, STAGE_H * 2]}>
      <meshBasicMaterial attach="material" color={'#000'} opacity={0} />
    </Plane>
  );
};

export default function Box(props) {
  return (
    <>
      {/* FRONT */}
      <SideWide position={[0, 0, STAGE_H]} rotation={[ANGLE * 2, 0, 0]} />
      {/* BACK */}
      <SideWide position={[0, 0, -STAGE_H]} rotation={[0, 0, 0]} />
      {/* RIGHT */}
      <SideShort position={[STAGE_W, 0, 0]} rotation={[0, -ANGLE, 0]} />
      {/* LEFT */}
      <SideShort position={[-STAGE_W, 0, 0]} rotation={[0, ANGLE, 0]} />

      {/* BOTTOM */}
      <SideWide position={[0, -STAGE_H, 0]} rotation={[-ANGLE, 0, 0]} />
    </>
  );
}
