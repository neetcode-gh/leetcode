/**
 Do not return anything, modify board in-place instead.
 */
function solve(board: string[][]): void {
  let rows = board.length;
  let cols = board[0].length;

  function dfs(r: number, c: number) {
    if (r < 0 || c < 0 || r === rows || c === cols || board[r][c] != "O") {
      return;
    }

    board[r][c] = "T";
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (
        (board[r][c] === "O" && [0, rows - 1].includes(r)) ||
        [0, cols - 1].includes(c)
      ) {
        dfs(r, c);
      }
    }
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (board[r][c] === "O") {
        board[r][c] = "X";
      }
    }
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (board[r][c] === "T") {
        board[r][c] = "O";
      }
    }
  }
}
