export function randomRotation(axis = 3) {
  const rotation = [...new Array(axis)].map(() => 2 * Math.PI * Math.random());
  return rotation;
}
