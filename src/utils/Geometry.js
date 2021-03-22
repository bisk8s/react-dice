import * as THREE from 'three';
// import * as CANNON from 'cannon';

export function geometryD4(radius) {
  let vertices = [
    [1, 1, 1],
    [-1, -1, 1],
    [-1, 1, -1],
    [1, -1, -1],
  ].flat();

  let faces = [
    [1, 0, 2, 1],
    [0, 1, 3, 2],
    [0, 3, 2, 3],
    [1, 2, 3, 4],
  ].flat();

  return createGeometry(vertices, faces, radius, -0.1, (Math.PI * 7) / 6, 0.96);
}

export function geometryD6(radius) {
  let vertices = [
    [-1, -1, -1],
    [1, -1, -1],
    [1, 1, -1],
    [-1, 1, -1],
    [-1, -1, 1],
    [1, -1, 1],
    [1, 1, 1],
    [-1, 1, 1],
  ];
  let faces = [
    [0, 3, 2, 1, 1],
    [1, 2, 6, 5, 2],
    [0, 1, 5, 4, 3],
    [3, 7, 6, 2, 4],
    [0, 4, 7, 3, 5],
    [4, 5, 6, 7, 6],
  ];
  return createGeometry(vertices, faces, radius, 0.1, Math.PI / 4, 0.96);
}

export function geometryD8(radius) {
  let vertices = [
    [1, 0, 0],
    [-1, 0, 0],
    [0, 1, 0],
    [0, -1, 0],
    [0, 0, 1],
    [0, 0, -1],
  ];
  let faces = [
    [0, 2, 4, 1],
    [0, 4, 3, 2],
    [0, 3, 5, 3],
    [0, 5, 2, 4],
    [1, 3, 4, 5],
    [1, 4, 2, 6],
    [1, 2, 5, 7],
    [1, 5, 3, 8],
  ];
  return createGeometry(vertices, faces, radius, 0, -Math.PI / 4 / 2, 0.965);
}

export function geometryD10(radius) {
  // total sides
  const totalSides = 10;
  const sides = [...new Array(totalSides)];

  // top and bottom vertices
  const vertices = [
    [0, 0, 1],
    [0, 0, -1],
  ];

  // middle vertices
  sides.forEach((_, sideIndex) => {
    const wave = (sideIndex * Math.PI * 2) / totalSides;
    vertices.push([
      -Math.cos(wave),
      -Math.sin(wave),
      0.105 * (sideIndex % 2 ? 1 : -1),
    ]);
  });

  const sideD10 = (pivot, sideIndex) => {
    const a = sideIndex + 2;
    const b = sideIndex + 3;
    return [pivot, a, b <= totalSides + 1 ? b : 2];
  };

  // faces
  const faces = [
    ...sides.map((_, sideIndex) => sideD10(0, sideIndex)),
    ...sides.map((_, sideIndex) => sideD10(1, sideIndex).reverse()),
  ];

  return createGeometry(vertices, faces, radius, 0);
}

export function geometryD12(radius) {
  let p = (1 + Math.sqrt(5)) / 2,
    q = 1 / p;
  let vertices = [
    [0, q, p],
    [0, q, -p],
    [0, -q, p],
    [0, -q, -p],
    [p, 0, q],
    [p, 0, -q],
    [-p, 0, q],
    [-p, 0, -q],
    [q, p, 0],
    [q, -p, 0],
    [-q, p, 0],
    [-q, -p, 0],
    [1, 1, 1],
    [1, 1, -1],
    [1, -1, 1],
    [1, -1, -1],
    [-1, 1, 1],
    [-1, 1, -1],
    [-1, -1, 1],
    [-1, -1, -1],
  ];
  let faces = [
    [2, 14, 4, 12, 0, 1],
    [15, 9, 11, 19, 3, 2],
    [16, 10, 17, 7, 6, 3],
    [6, 7, 19, 11, 18, 4],
    [6, 18, 2, 0, 16, 5],
    [18, 11, 9, 14, 2, 6],
    [1, 17, 10, 8, 13, 7],
    [1, 13, 5, 15, 3, 8],
    [13, 8, 12, 4, 5, 9],
    [5, 4, 14, 9, 15, 10],
    [0, 12, 8, 10, 16, 11],
    [3, 19, 7, 17, 1, 12],
  ];
  return createGeometry(vertices, faces, radius, 0.2, -Math.PI / 4 / 2, 0.968);
}

export function geometryD20(radius) {
  let t = (1 + Math.sqrt(5)) / 2;
  let vertices = [
    [-1, t, 0],
    [1, t, 0],
    [-1, -t, 0],
    [1, -t, 0],
    [0, -1, t],
    [0, 1, t],
    [0, -1, -t],
    [0, 1, -t],
    [t, 0, -1],
    [t, 0, 1],
    [-t, 0, -1],
    [-t, 0, 1],
  ];
  let faces = [
    [0, 11, 5, 1],
    [0, 5, 1, 2],
    [0, 1, 7, 3],
    [0, 7, 10, 4],
    [0, 10, 11, 5],
    [1, 5, 9, 6],
    [5, 11, 4, 7],
    [11, 10, 2, 8],
    [10, 7, 6, 9],
    [7, 1, 8, 10],
    [3, 9, 4, 11],
    [3, 4, 2, 12],
    [3, 2, 6, 13],
    [3, 6, 8, 14],
    [3, 8, 9, 15],
    [4, 9, 5, 16],
    [2, 4, 11, 17],
    [6, 2, 10, 18],
    [8, 6, 7, 19],
    [9, 8, 1, 20],
  ];
  return createGeometry(vertices, faces, radius, -0.2, -Math.PI / 4 / 2, 0.955);
}

export function createGeometry(vertices, faces, radius) {
  const args = [vertices.flat(), faces.flat(), radius, 0];
  let geometry = new THREE.PolyhedronGeometry(...args);

  const af = (Math.PI * 6) / 5;
  const tab = 0;
  const fs = 2; // face sides

  // set each face a material
  geometry.faces.forEach((face, i, arr) => {
    const index = Math.ceil(10 * ((i + 1) / arr.length));
    face.materialIndex = index;
  });

  // uv mapping
  geometry.faceVertexUvs[0].forEach((uv, i) => {
    uv[0].set(
      (Math.cos(af) + 1 + tab) / 2 / (1 + tab),
      (Math.sin(af) + 1 + tab) / 2 / (1 + tab)
    );
    uv[1].set(
      (Math.cos(fs * (i + 1) + af) + 1 + tab) / 2 / (1 + tab),
      (Math.sin(fs * (i + 1) + af) + 1 + tab) / 2 / (1 + tab)
    );
    uv[2].set(
      (Math.cos(fs * (i + 2) + af) + 1 + tab) / 2 / (1 + tab),
      (Math.sin(fs * (i + 2) + af) + 1 + tab) / 2 / (1 + tab)
    );
  });
  geometry.uvsNeedUpdate = true;

  geometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(), radius);

  return [geometry, args];
}
