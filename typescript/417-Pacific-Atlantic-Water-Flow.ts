function pacificAtlantic(heights: number[][]): number[][] {
  let rows = heights.length;
  let cols = heights[0].length;
  let pac = new Set<string>();
  let atl = new Set<string>();

  function dfs(r: number, c: number, visit: Set<string>, prevHeigh: number) {
    if (
      visit.has(r + "," + c) ||
      r < 0 ||
      c < 0 ||
      r === rows ||
      c === cols ||
      heights[r][c] < prevHeigh
    ) {
      return;
    }

    visit.add(r + "," + c);
    dfs(r + 1, c, visit, heights[r][c]);
    dfs(r - 1, c, visit, heights[r][c]);
    dfs(r, c + 1, visit, heights[r][c]);
    dfs(r, c - 1, visit, heights[r][c]);
  }

  for (let c = 0; c < cols; c++) {
    dfs(0, c, pac, heights[0][c]);
    dfs(rows - 1, c, atl, heights[rows - 1][c]);
  }

  for (let r = 0; r < rows; r++) {
    dfs(r, 0, pac, heights[r][0]);
    dfs(r, cols - 1, atl, heights[r][cols - 1]);
  }

  const res: number[][] = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (pac.has(r + "," + c) && atl.has(r + "," + c)) {
        res.push([r, c]);
      }
    }
  }

  return res;
}
