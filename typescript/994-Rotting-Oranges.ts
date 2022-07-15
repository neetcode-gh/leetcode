function orangesRotting(grid: number[][]): number {
  const q: number[][] = [];

  let time = 0;
  let fresh = 0;
  const rows = grid.length;
  const cols = grid[0].length;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 1) {
        fresh += 1;
      }
      if (grid[r][c] === 2) {
        q.push([r, c]);
      }
    }
  }

  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  while (q.length && fresh > 0) {
    let length = q.length;
    for (let i = 0; i < length; i++) {
      const [r, c] = q.shift()!;
      for (const [dr, dc] of directions) {
        let row = dr + r;
        let col = dc + c;
        if (
          row < 0 ||
          row === grid.length ||
          col < 0 ||
          col === grid[0].length ||
          grid[row][col] != 1
        ) {
          continue;
        }

        grid[row][col] = 2;
        fresh -= 1;
        q.push([row, col]);
      }
    }
    time += 1;
  }

  return fresh === 0 ? time : -1;
}
