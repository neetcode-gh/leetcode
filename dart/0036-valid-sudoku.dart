// As the board size is fixed
// it will result in the following
// Time Complexity: O(1)
// Space Complexity: O(1)

class Solution {
  bool isValidSudoku(List<List<String>> board) {
    var rows = List.filled(9, 0);
    var cols = List.filled(9, 0);
    var grids = List.filled(9, 0);

    for (int r = 0; r < 9; r++) {
      for (int c = 0; c < 9; c++) {
        if (board[r][c] == ".") continue;

        var idx = int.parse(board[r][c]) - 1;

        if (rows[r] & 1 << idx != 0) return false;
        rows[r] |= 1 << idx;

        if (cols[c] & 1 << idx != 0) return false;
        cols[c] |= 1 << idx;

        if (grids[r ~/ 3 * 3 + c ~/ 3] & 1 << idx != 0) return false;
        grids[r ~/ 3 * 3 + c ~/ 3] |= 1 << idx;
      }
    }

    return true;
  }
}
