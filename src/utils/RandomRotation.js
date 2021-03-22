export function randomRotation(axis = 3) {
  return [...new Array(axis)].map(() => Math.random());
}
