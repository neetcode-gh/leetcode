func isValidSudoku(board [][]byte) bool {

	rows := make(map[int][]bool)
	cols := make(map[int][]bool)
	boxes := make(map[int][]bool)

	for i := 0; i < 9; i++ {
		rows[i] = make([]bool, 9)
		cols[i] = make([]bool, 9)
		boxes[i] = make([]bool, 9)
	}

	for i := 0; i < 9; i++ {
		for j := 0; j < 9; j++ {
			if board[i][j] != '.' {
				num := int(board[i][j]-'0') - 1

				idxBoxes := (i/3)*3 + j/3

				if rows[j][num] || cols[i][num] || boxes[idxBoxes][num] {
					return false
				}

				rows[j][num] = true
				cols[i][num] = true
				boxes[idxBoxes][num] = true
			}
		}
	}

	return true
}