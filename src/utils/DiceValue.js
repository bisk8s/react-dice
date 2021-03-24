import * as THREE from 'three';

// Must be a better way...
/*
 * - maybe a raycast?
 * - what about the materialIndex?
 */
export default function getDiceValue(
  diceType,
  geometry,
  body,
  positionCorrection = 0
) {
  // Follow me in this amazing comments:
  // 'UP' vector, down case it is a D4
  let vector = new THREE.Vector3(0, diceType === 'D4' ? -1 : 1, 0);
  // set some aux variables
  let closestFace = null; // closest face container
  let closestAngle = Math.PI * 2; // set it to maximun possible angle (360°'ish euler value)
  // check each face to get the closet to the top
  geometry.faces.forEach((face, i) => {
    let angle = face.normal
      .clone() // 'cause we do not want to apply this tranformation
      .applyQuaternion(body.quaternion) // rotate geom to rigidbody position
      .angleTo(vector); // get the angle dif to up
    // get the lowest angle
    if (angle < closestAngle) {
      closestAngle = angle;
      // save the current face
      closestFace = face;
    }
  });
  // [HACKY] material index is the ~same~ to the value
  let valueFromMaterialIndex = closestFace.materialIndex + positionCorrection;
  // [hacky] d100 value
  if (diceType === 'D100') {
    valueFromMaterialIndex *= 10;
  }
  // no zeros for d10
  if (diceType === 'D10' && valueFromMaterialIndex === 0) {
    valueFromMaterialIndex = 10;
  }
  // marvel this returned pearl
  return valueFromMaterialIndex;
}
