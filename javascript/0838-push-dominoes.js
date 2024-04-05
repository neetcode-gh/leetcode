var pushDominoes = function (dominoes) {
  const n = dominoes.length;
  const forces = new Array(n).fill(0);

  // Pass from left to right
  let force = 0;
  for (let i = 0; i < n; i++) {
    if (dominoes[i] === "R") {
      force = n;
    } else if (dominoes[i] === "L") {
      force = 0;
    } else {
      force = Math.max(force - 1, 0);
    }
    forces[i] = force;
  }

  // Pass from right to left
  force = 0;
  for (let i = n - 1; i >= 0; i--) {
    if (dominoes[i] === "L") {
      force = n;
    } else if (dominoes[i] === "R") {
      force = 0;
    } else {
      force = Math.max(force - 1, 0);
    }
    forces[i] -= force;
  }

  // Determine final state
  let result = "";
  for (const force of forces) {
    result += force > 0 ? "R" : force < 0 ? "L" : ".";
  }

  return result;
};
