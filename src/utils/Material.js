import * as THREE from 'three';

const labelColor = '#aaaaaa';
const diceColor = '#202020';
const materialOptions = {
  specular: 0x172022,
  color: 0xf0f0f0,
  shininess: 40,
};

function calcTextureSize(approx) {
  return Math.pow(2, Math.floor(Math.log(approx) / Math.log(2)));
}

function createTextTexture(text, color, backColor, fontSize, margin) {
  if (text === undefined) return null;
  let canvas = document.createElement('canvas');
  let context = canvas.getContext('2d');
  let ts = calcTextureSize(fontSize + fontSize * 2 * margin) * 2;
  canvas.width = canvas.height = ts;
  context.font = ts / (1 + 2 * margin) + 'pt Roboto';
  context.fillStyle = backColor;
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillStyle = color;
  context.fillText(text, canvas.width / 2, canvas.height / 2);
  if (text === '6' || text === '9') {
    context.fillText('  .', canvas.width / 2, canvas.height / 2);
  }
  const texture = new THREE.CanvasTexture(
    canvas,
    THREE.UVMapping,
    THREE.RepeatWrapping,
    THREE.RepeatWrapping
  );

  return texture;
}

export function createDiceMaterials(faceLabels, fontSize, margin) {
  return faceLabels.map((faceLabel) => {
    const texture = createTextTexture(
      faceLabel,
      labelColor,
      diceColor,
      fontSize,
      margin
    );

    const material = new THREE.MeshPhongMaterial({
      ...materialOptions,
      map: texture,
      side: THREE.DoubleSide,
    });

    return material;
  });
}

export const standartD20Labels = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
];

export const standartD100Labels = [
  '00',
  '10',
  '20',
  '30',
  '40',
  '50',
  '60',
  '70',
  '80',
  '90',
];

export const D20Materials = createDiceMaterials(standartD20Labels, 50, 1.2);
