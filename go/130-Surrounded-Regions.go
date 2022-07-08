func solve(board [][]byte)  {
    n := len(board)
    m := len(board[0])

    // If board have less than 3 size in any direction: nothing to do, because all cells located on borders
    if n < 3 || m < 3 {
        return    
    }
    
    // Go and check left and right borders of the board
    for row := 0; row < n; row++ {
        if board[row][0] == 'O' {
            dfs(row, 0, n, m, board)
        }
        if board[row][m - 1] == 'O' {
            dfs(row, m - 1, n, m, board)
        }
    }
    
    // Same for check up and down borders of the board
    // Since corners (0,0) and (n - 1, m - 1) where checked in previous cycle, skip them in this one
    for col := 1; col < m - 1; col++ {
        if board[0][col] == 'O' {
            dfs(0, col, n, m, board)
        }
        if board[n - 1][col] == 'O' {
            dfs(n - 1, col, n, m, board)
        }
    }

    // Follow through the whole board and flip all 'R' cells back into 'O' and all 'O' cell to 'X'
    // since they're unreacheable from the board located 'O' cell if any
    for row := 0; row < n; row++ {
        for col := 0; col < m; col++ {
            if board[row][col] == 'O' {
                board[row][col] = 'X'
            } else if board[row][col] == 'R' {
                board[row][col] = 'O'
            }
        }
    }    
}

// DFS to look for the next 'O' cell upper, lower, to the right and to the left of current coordinates
// If 'O' cell is found, recursevly mark this cell as 'R' which is mean REACHED
func dfs(row int, col int, n int, m int, board [][]byte) {
    board[row][col] = 'R'
    if row > 0 && board[row - 1][col] == 'O' {
        dfs(row - 1, col, n, m, board)
    }
    if row < n - 1 && board[row + 1][col] == 'O' {
        dfs(row + 1, col, n, m, board)
    }
    if col > 0 && board[row][col - 1] == 'O' {
        dfs(row, col - 1, n, m, board)
    }
    if col < m - 1 && board[row][col + 1] == 'O' {
        dfs(row, col + 1, n, m, board)
    }
}