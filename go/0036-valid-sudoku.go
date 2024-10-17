func isValidSudoku(board [][]byte) bool {
	rows := [9][9]bool{}
	cols := [9][9]bool{}
	squares := [9][9]bool{}

	for r := range 9 {
		for c := range 9 {
			if board[r][c] == '.' {
				continue
			}

			value := board[r][c] - '1'
			s := r/3*3 + c/3
			if rows[r][value] || cols[c][value] || squares[s][value] {
				return false
			}

			rows[r][value] = true
			cols[c][value] = true
			squares[s][value] = true
		}
	}

	return true
}
