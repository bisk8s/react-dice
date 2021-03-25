import * as THREE from 'three';

const materialOptions = {
  specular: 0x172022,
  color: 0xf0f0f0,
  shininess: 0,
};

function calcTextureSize(approx) {
  return 2 * Math.pow(2, Math.floor(Math.log(approx) / Math.log(2)));
}

function createTextTexture(text, color, backColor, fontSize, margin) {
  if (text === undefined) return null;
  let canvas = document.createElement('canvas');
  let context = canvas.getContext('2d');
  let ts = calcTextureSize(fontSize + fontSize * 2 * margin);

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

function createVampireTexture(type, backColor, iconSize, margin) {
  let canvas = document.createElement('canvas');
  let context = canvas.getContext('2d');
  let ts = calcTextureSize(iconSize + iconSize * 2 * margin);

  canvas.width = canvas.height = ts;
  context.fillStyle = backColor;
  context.fillRect(0, 0, canvas.width, canvas.height);

  const image = new Image(ts, ts);
  image.src = `/assets/v_${type}.png`;
  image.onload = () => {
    context.drawImage(image, 0, 0, ts * 0.9, ts * 0.9);
  };

  const texture = new THREE.CanvasTexture(
    canvas,
    THREE.UVMapping,
    THREE.RepeatWrapping,
    THREE.RepeatWrapping
  );

  return texture;
}

function createHungerTexture(type, backColor, iconSize, margin) {
  let canvas = document.createElement('canvas');
  let context = canvas.getContext('2d');
  let ts = calcTextureSize(iconSize + iconSize * 2 * margin);

  canvas.width = canvas.height = ts;
  context.fillStyle = backColor;
  context.fillRect(0, 0, canvas.width, canvas.height);

  const image = new Image(ts, ts);
  image.src = `/assets/h_${type}.png`;
  image.onload = () => {
    context.drawImage(image, 0, 0, ts * 0.9, ts * 0.9);
  };

  const texture = new THREE.CanvasTexture(
    canvas,
    THREE.UVMapping,
    THREE.RepeatWrapping,
    THREE.RepeatWrapping
  );

  return texture;
}

export function createTextDiceMaterials(
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

export function createVampireDiceMaterials(diceColor, iconSize, margin) {
  return [...new Array(10)]
    .map((_, index) => index)
    .map((index) => {
      const type = index % 2 ? 'success' : index === 0 ? 'crit' : 'fail';
      const texture = createVampireTexture(type, diceColor, iconSize, margin);
      const material = new THREE.MeshPhongMaterial({
        ...materialOptions,
        map: texture,
      });
      return material;
    });
}

export function createHungerDiceMaterials(diceColor, iconSize, margin) {
  return [...new Array(10)]
    .map((_, index) => index)
    .map((index) => {
      const type =
        index > 5
          ? 'success'
          : index === 0
          ? 'crit'
          : index === 1
          ? 'beast'
          : 'fail';
      const texture = createHungerTexture(type, diceColor, iconSize, margin);
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

export const D20Materials = createTextDiceMaterials(
  standartD20Labels,
  '#aaaaaa',
  '#202020',
  50,
  1.2
);

export const V10Materials = createVampireDiceMaterials('#202020', 50, 1.2);

export const H10Materials = createHungerDiceMaterials('#aa0000', 50, 1.2);
