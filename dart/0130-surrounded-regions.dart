class Solution {
  late List<List<String>> board;
  late int rows;
  late int columns;

  bool isInBound(int row, int column) {
    return 0 <= row && row < rows && 0 <= column && column < columns;
  }

  void dfs(int row, int column) {
    if (!isInBound(row, column) || board[row][column] != 'O') {
      return;
    }

    board[row][column] = 'T';

    dfs(row + 1, column);
    dfs(row, column + 1);
    dfs(row - 1, column);
    dfs(row, column - 1);
  }

  void solve(List<List<String>> board) {
    this.board = board;
    rows = board.length;
    columns = board[0].length;

    // Traverse the first and last columns
    for (int column = 0; column < columns; column++) {
      dfs(0, column);
      dfs(rows - 1, column);
    }

    // Traverse the first and last rows
    for (int row = 0; row < rows; row++) {
      dfs(row, 0);
      dfs(row, columns - 1);
    }

    // Replace all 'O' with 'X' and 'T' back to 'O'
    for (int row = 0; row < rows; row++) {
      for (int column = 0; column < columns; column++) {
        if (board[row][column] == 'O') {
          board[row][column] = 'X';
        } else if (board[row][column] == 'T') {
          board[row][column] = 'O';
        }
      }
    }
  }
}