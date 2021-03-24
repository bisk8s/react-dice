import React from 'react';
import { Plane } from '@react-three/drei';
import { usePlane } from 'use-cannon';

const W = 1920 / 100;
const H = 1080 / 100;
const ANGLE = Math.PI / 2;

const SideShort = ({ ...props }) => {
  const [ref] = usePlane(() => ({ ...props }));
  return (
    <Plane ref={ref} args={[H * 2, H * 2]}>
      <meshBasicMaterial attach="material" color={'#000'} opacity={0.3} />
    </Plane>
  );
};

const SideWide = ({ ...props }) => {
  const [ref] = usePlane(() => ({ ...props }));
  return (
    <Plane ref={ref} args={[W * 2, H * 2]}>
      <meshBasicMaterial attach="material" color={'#000'} opacity={0.3} />
    </Plane>
  );
};

export default function Box(props) {
  return (
    <>
      {/* FRONT */}
      <SideWide position={[0, 0, H]} rotation={[ANGLE * 2, 0, 0]} />
      {/* BACK */}
      <SideWide position={[0, 0, -H]} rotation={[0, 0, 0]} />
      {/* RIGHT */}
      <SideShort position={[W, 0, 0]} rotation={[0, -ANGLE, 0]} />
      {/* LEFT */}
      <SideShort position={[-W, 0, 0]} rotation={[0, ANGLE, 0]} />

      {/* BOTTOM */}
      <SideWide position={[0, -H, 0]} rotation={[-ANGLE, 0, 0]} />
    </>
  );
}
