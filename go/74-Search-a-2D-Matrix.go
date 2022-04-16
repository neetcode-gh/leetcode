package leetcode

func searchMatrix(matrix [][]int, target int) bool {
	if len(matrix) == 0 {
		return false
	}

	m := len(matrix[0])
	low := 0
	high := len(matrix[0])*len(matrix) - 1

	for low <= high {
		mid := low + (high-low)/2
		if matrix[mid/m][mid%m] == target {
			return true
		} else if matrix[mid/m][mid%m] > target {
			high = mid - 1
		} else {
			low = mid + 1
		}
	}

	return false
}
