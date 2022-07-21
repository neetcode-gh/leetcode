/**
 * @param {number[][]} grid
 * @return {number}
 */
var orangesRotting = function (grid) {
  let [ROWS, COLS, time, fresh, q] = [grid.length, grid[0].length, 0, 0, []];
  let dirs = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  // count fresh oranges and add rotten oranges to queue
  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      if (grid[i][j] === 1) fresh++;
      if (grid[i][j] === 2) q.push([i, j]);
    }
  }

  while (q.length > 0 && fresh > 0) {
    let qLen = q.length;

    for (let rot = 0; rot < qLen; rot++) {
      let [row, col] = q.shift();

      for (let dir of dirs) {
        let [r, c] = [row + dir[0], col + dir[1]];

        if (r < 0 || r >= ROWS || c < 0 || c >= COLS || grid[r][c] !== 1)
          continue;

        grid[r][c] = 2;
        fresh--;
        q.push([r, c]);
      }
    }

    time++;
  }

  return fresh > 0 ? -1 : time;
};
