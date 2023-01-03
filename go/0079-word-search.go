package main

func exist(board [][]byte, word string) bool {
	n := len(board)
	m := len(board[0])

	var dfs func(i int, j int, curr int) bool
	dfs = func(i int, j int, curr int) bool {
		if i < 0 || j < 0 || i >= n || j >= m || curr == len(word) {
			return false
		}
		if board[i][j] != word[curr] || board[i][j] == '*' {
			return false
		}
		if curr == len(word)-1 {
			return true
		}

		tmp := board[i][j]
		board[i][j] = '*'

		res := dfs(i+1, j, curr+1) || dfs(i-1, j, curr+1) || dfs(i, j-1, curr+1) || dfs(i, j+1, curr+1)

		board[i][j] = tmp

		return res
	}

	for i := 0; i < n; i++ {
		for j := 0; j < m; j++ {
			if dfs(i, j, 0) {
				return true
			}
		}
	}

	return false
}
