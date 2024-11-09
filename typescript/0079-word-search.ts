function exist(board: string[][], word: string): boolean {
  const rowsLength = board.length;
  const colsLength = board[0].length;

  function outOfBounds(r: number, c: number) {
    return r < 0 || c < 0 || r >= rowsLength || c >= colsLength;
  }

  // idx: the index of the current character in the word we're looking for
  function dfs(row: number, col: number, idx: number): boolean {
    if (idx === word.length) {
      return true;
    }
    if (outOfBounds(row, col) || word[idx] !== board[row][col]) {
      return false;
    }

    // Mark the current cell as visited
    let currentCell = board[row][col];
    board[row][col] = '*'; 

    // Pass idx + 1 because we're looking for 
    // the next character in the word now
    let result = dfs(row + 1, col, idx + 1) || // down
                 dfs(row - 1, col, idx + 1) || // up
                 dfs(row, col + 1, idx + 1) || // right
                 dfs(row, col - 1, idx + 1);   // left

    // Reset the current cell to its original value 
    // because we're done visiting it
    board[row][col] = currentCell;

    return result;
  }

  // For each cell, do a depth-first search
  for (let i = 0; i < rowsLength; i++) {
    for (let j = 0; j < colsLength; j++) {
      if (dfs(i, j, 0)) {
        return true;
      }
    }
  }

  return false;
}
