class Solution {
    func solve(_ board: inout [[Character]]) {
        var rows = board.count
        var columns = board[0].count
        
        // 1. DFS Capture unsurrounded regions (O -> T)
        for r in 0..<rows {
            for c in 0..<columns {
                if board[r][c] == "O" &&
                    ([0, rows - 1].contains(r) || [0, columns - 1].contains(c)) {
                    capture(r, c, &board)
                }
            }
        }
        
        // 2. Capture surrounded regions (O -> X)
        for r in 0..<rows {
            for c in 0..<columns {
                if board[r][c] == "O" {
                    board[r][c] = Character("X")
                }
            }
        }
        
        // 3. Uncapture surrounded regions (T -> O)
        for r in 0..<rows {
            for c in 0..<columns {
                if board[r][c] == "T" {
                    board[r][c] = Character("O")
                }
            }
        }
    }
    
    func capture(_ r: Int, _ c: Int, _ board: inout [[Character]]) {
        // Make sure r and c are in bounds
        guard r >= 0, r < board.count, c >= 0, c < board[0].count, board[r][c] == "O" else {
            return
        }
        
        board[r][c] = Character("T")

        capture(r - 1, c, &board)
        capture(r + 1, c, &board)
        capture(r, c - 1, &board)
        capture(r, c + 1, &board)
    }
}