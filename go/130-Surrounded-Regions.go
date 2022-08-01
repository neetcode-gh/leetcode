func solve(board [][]byte) {
	m := len(board)
	n := len(board[0])

	for i := 0; i < n; i++ {
		dfs(board, 0, i)
		dfs(board, m-1, i)
	}

	for i := 0; i < m; i++ {
		dfs(board, i, 0)
		dfs(board, i, n-1)
	}

	for i := 0; i < m; i++ {
		for j := 0; j < n; j++ {
			if board[i][j] == 'O' {
				board[i][j] = 'X'
			}

			if board[i][j] == '*' {
				board[i][j] = 'O'
			}
		}
	}
}

func dfs(board [][]byte, m int, n int) {
	if m < 0 || m >= len(board) || n < 0 || n >= len(board[0]) || board[m][n] == 'X' || board[m][n] == '*' {
		return
	}

	board[m][n] = '*'
	dfs(board, m+1, n)
	dfs(board, m-1, n)
	dfs(board, m, n+1)
	dfs(board, m, n-1)
}