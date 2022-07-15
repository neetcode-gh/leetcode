function dfs(grid: number[][], i: number, j: number) {
  if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length || grid[i][j] === 0) {
    return 0;
  }

  grid[i][j] = 0;
  const up = dfs(grid, i + 1, j);
  const down = dfs(grid, i - 1, j);
  const right = dfs(grid, i, j + 1);
  const left = dfs(grid, i, j - 1);

  return 1 + up + down + right + left;
}

function maxAreaOfIsland(grid: number[][]): number {
  let max = 0;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === 1) {
        max = Math.max(max, dfs(grid, i, j));
      }
    }
  }
  return max;
}
