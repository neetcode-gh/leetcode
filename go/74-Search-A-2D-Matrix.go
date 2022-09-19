package main

func searchMatrix(matrix [][]int, target int) bool {
	ROWS := len(matrix)
	COLUMNS := len(matrix[0])

	top := 0
	bot := ROWS - 1

	for top <= bot {
		row := (top + bot) / 2
		if target > matrix[row][len(matrix[row])-1] {
			top = row + 1
		} else if target < matrix[row][0] {
			bot = row - 1
		} else {
			break
		}
	}

	if top >= bot {
		return false
	}

	row := (top + bot) / 2
	left := 0
	right := COLUMNS - 1
	for left <= right {
		middle := (left + right) / 2
		if target > matrix[row][middle] {
			left = middle + 1
		} else if target < matrix[row][middle] {
			right = middle - 1
		} else {
			return true
		}
	}
	return false

}
