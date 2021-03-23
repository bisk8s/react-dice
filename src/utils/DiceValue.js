import * as THREE from 'three';

export default function geDiceValue(diceType, geometry, body) {
  let vector = new THREE.Vector3(0, 0, diceType === 'D4' ? -1 : 1);
  let closestFace;
  let closestAngle = Math.PI * 2;
  geometry.faces.forEach((face) => {
    let angle = face.normal
      .clone()
      .applyQuaternion(body.quaternion)
      .angleTo(vector);
    if (angle < closestAngle) {
      closestAngle = angle;
      closestFace = face;
    }
  });
  let matindex = closestFace.materialIndex - 1;
  if (diceType === 'd100') matindex *= 10;
  if (diceType === 'd10' && matindex === 0) matindex = 10;
  return matindex;
}
