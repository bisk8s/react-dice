import * as THREE from 'three';

const degrees = Math.PI / 180;

const materialOptions = {
  specular: 0x172022,
  color: 0xf0f0f0,
  shininess: 0,
};

function calcTextureSize(size, margin) {
  return Math.floor(size + margin * 2);
}

function createTextTexture(text, color, backColor, size, margin) {
  if (text === undefined) return null;
  let canvas = document.createElement('canvas');
  let context = canvas.getContext('2d');
  let ts = calcTextureSize(size, margin);

  canvas.width = canvas.height = ts;
  const fontSize = ts - margin * 4;
  context.font = fontSize + 'px Arial';
  context.fillStyle = backColor;
  context.fillRect(0, 0, ts, ts);

  context.textAlign = 'center';
  context.textBaseline = 'middle';

  const x = ts * 0.5;
  const y = ts * 0.5;
  context.fillStyle = color;
  context.fillText(text, x, y);
  if (text === '6' || text === '9') {
    context.fillText('  .', x, y);
  }

  const texture = new THREE.CanvasTexture(
    canvas,
    THREE.UVMapping,
    THREE.RepeatWrapping,
    THREE.RepeatWrapping
  );

  return texture;
}

function createVampireTexture(type, backColor, size, margin) {
  let canvas = document.createElement('canvas');
  let context = canvas.getContext('2d');
  let ts = calcTextureSize(size, margin);

  canvas.width = canvas.height = ts;
  context.fillStyle = backColor;
  context.fillRect(0, 0, ts, ts);

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

function createHungerTexture(type, backColor, size, margin) {
  let canvas = document.createElement('canvas');
  let context = canvas.getContext('2d');
  let ts = calcTextureSize(size, margin);

  canvas.width = canvas.height = ts;
  context.fillStyle = backColor;
  context.fillRect(0, 0, ts, ts);

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

function createD4TextTexture(texts, labelColor, diceColor, size, margin) {
  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');
  let ts = calcTextureSize(size, margin);

  canvas.width = canvas.height = ts;
  const fontSize = ts * 0.33;
  context.font = fontSize + 'pt Arial';
  context.fillStyle = diceColor;
  context.fillRect(0, 0, ts, ts);
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillStyle = labelColor;

  context.translate(ts * 0.5, margin + ts * 0.5);
  // context.rotate(180 * degrees);

  console.log(texts);
  texts.forEach((text) => {
    context.fillText(text, 0, -fontSize);
    const angle = 120 * degrees;
    context.rotate(angle);
  });
  console.log(canvas.toDataURL());

  var texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;
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

export function createD4Materials(
  faceLabels,
  labelColor,
  diceColor,
  fontSize,
  margin
) {
  var materials = faceLabels.map((faceLabel) => {
    return new THREE.MeshPhongMaterial({
      ...materialOptions,
      map: createD4TextTexture(
        faceLabel,
        labelColor,
        diceColor,
        fontSize,
        margin
      ),
    });
  });

  return materials;
}

export function createVampireDiceMaterials(diceColor, iconSize, margin) {
  return ['fail', 'success', 'crit'].map((type) => {
    const texture = createVampireTexture(type, diceColor, iconSize, margin);
    const material = new THREE.MeshPhongMaterial({
      ...materialOptions,
      map: texture,
    });
    return material;
  });
}

export function createHungerDiceMaterials(diceColor, iconSize, margin) {
  return ['fail', 'success', 'crit', 'beast'].map((type) => {
    const texture = createHungerTexture(type, diceColor, iconSize, margin);
    const material = new THREE.MeshPhongMaterial({
      ...materialOptions,
      map: texture,
    });
    return material;
  });
}

const standartD20Labels = [
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

// const standartD100Labels = [
//   '00',
//   '10',
//   '20',
//   '30',
//   '40',
//   '50',
//   '60',
//   '70',
//   '80',
//   '90',
// ];

var standartD4labels = [
  [4, 2, 3],
  [3, 1, 4],
  [4, 1, 2],
  [2, 1, 3],
];

export const D20Materials = createTextDiceMaterials(
  standartD20Labels,
  '#aaaaaa',
  '#000020',
  50,
  5
);

export const D4Materials = createD4Materials(
  standartD4labels,
  '#aaaaaa',
  '#000020',
  50,
  10
);

export const V10Materials = createVampireDiceMaterials('#101010', 50, 1.2);

export const H10Materials = createHungerDiceMaterials('#aa0000', 50, 1.2);
