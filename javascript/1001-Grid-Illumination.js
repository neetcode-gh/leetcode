/**
 * @param {number} n
 * @param {number[][]} lamps
 * @param {number[][]} queries
 * @return {number[]}
 */
const gridIllumination = (n, lamps, queries) => {
  const lampSet = new Set();
  const rows = new Map();
  const cols = new Map();
  const ne = new Map();
  const se = new Map();

  for (let i = 0; i < lamps.length; i++) {
    const [r, c] = lamps[i];
    const lampKey = `${r},${c}`;

    if (lampSet.has(lampKey)) {
      continue;
    }

    lampSet.add(lampKey);
    rows.set(r, (rows.get(r) ?? 0) + 1);
    cols.set(c, (cols.get(c) ?? 0) + 1);
    ne.set(r + c, (ne.get(r + c) ?? 0) + 1);
    se.set(r - c, (se.get(r - c) ?? 0) + 1);
  }

  const res = new Array(queries.length).fill(0);
  const adjVectors = [
    [0, 0],
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  for (let i = 0; i < queries.length; i++) {
    const [r, c] = queries[i];
    if (
      rows.get(r) > 0 ||
      cols.get(c) > 0 ||
      ne.get(r + c) > 0 ||
      se.get(r - c) > 0
    ) {
      res[i] = 1;
    }

    // Turn off lamps
    for (let j = 0; j < adjVectors.length; j++) {
      const [vr, vc] = adjVectors[j];
      const ar = r + vr;
      const ac = c + vc;
      const aLampKey = `${ar},${ac}`;

      if (0 <= ar && ar < n && 0 <= ac && ac < n && lampSet.has(aLampKey)) {
        lampSet.delete(aLampKey);
        rows.set(ar, (rows.get(ar) ?? 0) - 1);
        cols.set(ac, (cols.get(ac) ?? 0) - 1);
        ne.set(ar + ac, (ne.get(ar + ac) ?? 0) - 1);
        se.set(ar - ac, (se.get(ar - ac) ?? 0) - 1);
      }
    }
  }

  return res;
};
