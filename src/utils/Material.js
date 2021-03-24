import * as THREE from 'three';

const materialOptions = {
  specular: 0x172022,
  color: 0xf0f0f0,
  shininess: 0,
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

  ['#000000AA', color, '#FFFFFF33'].forEach((c, i) => {
    const x = canvas.width / 2 + i * 2;
    const y = canvas.height / 2 + i * 2;
    context.fillStyle = c;
    context.fillText(text, x, y);
    if (text === '6' || text === '9') {
      context.fillText('  .', x, y);
    }
  });

  const texture = new THREE.CanvasTexture(
    canvas,
    THREE.UVMapping,
    THREE.RepeatWrapping,
    THREE.RepeatWrapping
  );

  return texture;
}

export function createDiceMaterials(
  faceLabels,
  labelColor,
  diceColor,
  fontSize,
  margin
) {
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

export const D20Materials = createDiceMaterials(
  standartD20Labels,
  '#aaaaaa',
  '#002000',
  50,
  1.2
);

export const OnixMaterials = createDiceMaterials(
  standartD20Labels,
  '#aaaaaa',
  '#202020',
  50,
  1.2
);

export const HungerMaterials = createDiceMaterials(
  standartD20Labels,
  '#aaaaaa',
  '#aa0000',
  50,
  1.2
);
