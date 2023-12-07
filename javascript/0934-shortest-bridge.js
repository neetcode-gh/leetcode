const DIRECTIONS = [[-1, 0], [1, 0], [0, -1], [0, 1]];

const shortestBridge = (grid) => {
  const rows = grid.length;
  const cols = grid[0].length;

  let queue = [];

  const exploreIslandDFS = (row, col) => {
    if (row < 0 || row >= rows || col < 0 || col >= cols || grid[row][col] !== 1) {
      return false;
    }

    queue.push([row, col]);
    grid[row][col] = 2;

    exploreIslandDFS(row - 1, col);
    exploreIslandDFS(row + 1, col);
    exploreIslandDFS(row, col - 1);
    exploreIslandDFS(row, col + 1);

    return true;
  };

  const buildBridgeBFS = () => {
    let distance = -1;
    let currentQueue = [];

    while (queue.length) {
      currentQueue = queue;
      queue = [];

      for (let [row, col] of currentQueue) {
        for (let [dx, dy] of DIRECTIONS) {
          const nextRow = row + dx;
          const nextCol = col + dy;

          if (
            nextRow >= 0 &&
            nextRow < rows &&
            nextCol >= 0 &&
            nextCol < cols &&
            grid[nextRow][nextCol] !== 2
          ) {
            if (grid[nextRow][nextCol] === 1) {
              return distance + 1;
            }

            queue.push([nextRow, nextCol]);
            grid[nextRow][nextCol] = 2;
          }
        }
      }

      distance++;
    }

    return -1;
  };

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (exploreIslandDFS(i, j)) {
        return buildBridgeBFS();
      }
    }
  }

  return -1;
};