//////////////////////////////////////////////////////////////////////////////
// Depth First Search (DFS)
// Time: O(m*n)
// Space: O(m*n)
// You can implement either Depth First Search (DFS) or Breadth First Search
// (BFS). The only noticeable impact is the performance cost of the BFS queue
// is higher than the DFS call stack.
//////////////////////////////////////////////////////////////////////////////

/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
function solve(board) {
  const rowLen = board.length;
  const colLen = board[0].length;
  const lastRow = rowLen - 1;
  const lastCol = colLen - 1;

  for (let r = 0; r < rowLen; ++r) {
    markSeen(r, 0);
    markSeen(r, lastCol);
  }
  for (let c = 1; c < lastCol; ++c) {
    markSeen(0, c);
    markSeen(lastRow, c);
  }

  for (let r = 0; r < rowLen; ++r) {
    for (let c = 0; c < colLen; ++c) {
      switch (board[r][c]) {
        case 'O':
          board[r][c] = 'X';
          break;
        case 'A':
          board[r][c] = 'O';
          break;
      }
    }
  }

  /**
   * @param {number} r
   * @param {number} c
   * @return {void}
   */
  function markSeen(r, c) {
    if (!inBounds(r, c) || board[r][c] !== 'O') {
      return;
    }

    board[r][c] = 'A';

    markSeen(r - 1, c);
    markSeen(r + 1, c);
    markSeen(r, c - 1);
    markSeen(r, c + 1);
  }

  /**
   * @param {number} r
   * @param {number} c
   * @return {boolean}
   */
  function inBounds(r, c) {
    return r >= 0 && c >= 0 && r < rowLen && c < colLen;
  }
}
