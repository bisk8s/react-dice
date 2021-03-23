export function randomRotation(axis = 3) {
  return [...new Array(axis)].map(() => 2 * Math.PI * Math.random());
}
