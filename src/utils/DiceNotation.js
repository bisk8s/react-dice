export default function parseNotation(string) {
  const regex0 = /([0-9]+[a-z]+[0-9]+)/gi;
  const regex1 = /([0-9]+)([a-z]+[0-9]+)/gi;

  const notations = [...string.matchAll(regex0)].map((n) => n[0]);
  const dices = notations
    .map((note) => {
      const res = [...note.toUpperCase().matchAll(regex1)].flat();
      const a = [...new Array(parseInt(res[1]))].map(() => res[2]);
      return a;
    })
    .flat();

  return dices;
}
