const knownTypes = ['D4', 'D6', 'D8', 'D10', 'D12', 'D20'];

export default function parseNotation(notation) {
  let notationArr = notation.toUpperCase().split('@');
  let dr0 = /\s*(\d*)([a-z]+)(\d+)(\s*(\+|-)\s*(\d+)){0,1}\s*(\+|$)/gi;
  let dr1 = /(\b)*(\d+)(\b)*/gi;
  let ret = { set: [], constant: 0, result: [], error: false };
  let res;

  while ((res = dr0.exec(notationArr[0]))) {
    let command = res[2];
    if (command !== 'D') {
      ret.error = true;
      continue;
    }

    let count = parseInt(res[1]);
    if (res[1] === '') count = 1;
    let type = 'D' + res[3];

    if (knownTypes.indexOf(type) === -1) {
      ret.error = true;
      continue;
    }

    while (count--) ret.set.push(type);
    if (res[5] && res[6]) {
      if (res[5] === '+') ret.constant += parseInt(res[6]);
      else ret.constant -= parseInt(res[6]);
    }
  }

  while ((res = dr1.exec(notationArr[1]))) {
    ret.result.push(parseInt(res[2]));
  }

  return ret;
}
