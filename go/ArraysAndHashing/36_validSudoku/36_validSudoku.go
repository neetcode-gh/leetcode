package isValidSudoku

import "fmt"

func validRow(board [][]byte) bool {
	for i := 0; i < len(board); i++ {
		numberMap := make(map[byte]byte)
		for j := 0; j < len(board[i]); j++ {
			if board[i][j] == '.' {
				continue
			}
			_, ok := numberMap[board[i][j]]
			if ok {
				fmt.Println("Row Validation Failed ", board[i][j])
				return false
			} else {
				numberMap[board[i][j]] = 1
			}
		}
	}
	return true
}

func validColumn(board [][]byte) bool {

	for j := 0; j < len(board); j++ {
		numberMap := make(map[byte]byte)
		for i := 0; i < len(board); i++ {
			if board[i][j] == '.' {
				continue
			}
			_, ok := numberMap[board[i][j]]
			if ok {
				fmt.Println("Column Validation Failed")
				return false
			} else {
				numberMap[board[i][j]] = 1
			}
		}
	}

	return true
}

func validBoxes(board [][]byte) bool {
	rowItr := 0
	columnItr := 0

	for columnItr < 3 {
		rowItr = 0
		for rowItr < 3 {
			numberMap := make(map[byte]byte)
			for j := rowItr * 3; j < 3*rowItr+3; j++ {
				for k := 3 * columnItr; k < 3*columnItr+3; k++ {
					if board[j][k] == '.' {
						continue
					}
					_, ok := numberMap[board[j][k]]
					if ok {
						fmt.Println("Box Validation Failed ", j, k)
						return false
					} else {
						numberMap[board[j][k]] = 1
					}
				}
			}
			rowItr++
		}
		columnItr++
	}
	return true
}

func isValidSudoku(board [][]byte) bool {
	if !validRow(board) || !validColumn(board) || !validBoxes(board) {
		return false
	}
	return true
}
