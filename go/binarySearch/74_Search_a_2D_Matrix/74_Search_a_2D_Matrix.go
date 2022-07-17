package searcha2dmatrix

func searchMatrix(matrix [][]int, target int) bool {
	maxRowIndex, maxColIndex := len(matrix)-1, len(matrix[0])-1
	// first find the row in which the target might be present
	top, bottom := 0, maxRowIndex
	var probableRow int
	for top <= bottom {
		probableRow = (top + bottom) / 2
		if target > matrix[probableRow][maxColIndex] {
			top = probableRow + 1
		} else if target < matrix[probableRow][0] {
			bottom = probableRow - 1
		} else {
			break
		}
	}
	if top > bottom {
		return false
	}

	// find in the column the element using binary search
	left, right := 0, maxColIndex
	for left <= right {
		targetPosition := (left + right) / 2
		if target > matrix[probableRow][targetPosition] {
			left = targetPosition + 1
		} else if target < matrix[probableRow][targetPosition] {
			right = targetPosition - 1
		} else {
			return true
		}
	}
	if left > right {
		return false
	}

	return false
}
