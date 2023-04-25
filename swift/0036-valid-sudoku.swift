/**
 * Question Link: https://leetcode.com/problems/valid-sudoku/
 */

class ValidSudoku {
    func isValidSudoku(_ board: [[Character]]) -> Bool {
        var rows = [Set<Character>](repeating: .init(), count: 9)
        var columns = [Set<Character>](repeating: .init(), count: 9)
        var squares = [[Int]: Set<Character>]()

        for i in 0..<board.count {
            for j in 0..<board[i].count {
                if board[i][j] == "." {
                    continue
                }

                let key = [i / 3, j / 3]

                if rows[i].contains(board[i][j]) ||
                    columns[j].contains(board[i][j]) ||
                    (squares[key] != nil && squares[key]!.contains(board[i][j])) {
                    return false
                }

                rows[i].insert(board[i][j])
                columns[j].insert(board[i][j])
                squares[key, default: Set<Character>()].insert(board[i][j])
            }
        }
        return true
    }
}