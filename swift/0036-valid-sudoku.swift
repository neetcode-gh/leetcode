class Solution {
  func isValidSudoku(_ board: [[Character]]) -> Bool {
      var cols = [Set<Character>](repeating: Set<Character>(), count: 9)
      var rows = [Set<Character>](repeating: Set<Character>(), count: 9)
      var squares = [Set<Character>](repeating: Set<Character>(), count: 9)

      for r in 0..<9 {
          for c in 0..<9 {
              if board[r][c] == "." {
                  continue
              }
              if rows[r].contains(board[r][c]) || cols[c].contains(board[r][c]) || squares[(r / 3) * 3 + (c / 3)].contains(board[r][c]) {
                  return false
              }
              
              rows[r].insert(board[r][c])
              cols[c].insert(board[r][c])
              squares[(r / 3) * 3 + (c / 3)].insert(board[r][c])
          }
      }
      return true
  }
}
