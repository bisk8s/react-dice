import React from 'react';
import { usePlane } from 'use-cannon';

const W = 1920 / 100;
const H = 1080 / 100;
const ANGLE = Math.PI / 2;

const Plane = ({ ...props }) => {
  const [ref] = usePlane(() => ({ ...props }));
  return (
    <mesh ref={ref} receiveShadow>
      <planeBufferGeometry attach="geometry" args={[W * 2, H * 2]} />
      <meshBasicMaterial attach="material" color={'#000'} opacity={0} />
    </mesh>
  );
};

export default function Box(props) {
  return (
    <>
      {/* FRONT */}
      <Plane position={[0, 0, H]} rotation={[ANGLE * 2, 0, 0]} />
      {/* BACK */}
      <Plane position={[0, 0, -H]} rotation={[0, 0, 0]} />
      {/* RIGHT */}
      <Plane position={[W, 0, 0]} rotation={[0, -ANGLE, 0]} />
      {/* LEFT */}
      <Plane position={[-W, 0, 0]} rotation={[0, ANGLE, 0]} />

      {/* BOTTOM */}
      <Plane position={[0, 0, 0]} rotation={[-ANGLE, 0, 0]} />
    </>
  );
}
