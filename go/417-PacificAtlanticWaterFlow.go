func pacificAtlantic(matrix [][]int) [][]int {
	coordinate := [][]int{}
	if len(matrix) == 0 || len(matrix[0]) == 0 {
		return coordinate
	}
	// feet:
	// -1: no feet
	//  0: pacific × atlantic ×
	//  1: pacific √ atlantic ×
	//  2: pacific × atlantic √
	//  3: pacific √ atlantic √
	feet := make([][]int, len(matrix))
	for i := range feet {
		feet[i] = make([]int, len(matrix[i]))
	}
	for i := range feet {
		for j := range feet[i] {
			feet[i][j] = -1
		}
	}
	for i, vs := range matrix {
		for j, v := range vs {
			if dfs(matrix, feet, i, j, v) == 3 {
				coordinate = append(coordinate, []int{i, j})
			}
		}
	}
	return coordinate
}

func dfs(matrix [][]int, feet [][]int, i, j, l int) int {
	if i < 0 || j < 0 {
		return 1
	}
	if i >= len(matrix) || j >= len(matrix[0]) {
		return 2
	}
	// can't flow here
	if matrix[i][j] > l {
		return 0
	}
	// already reach here, just return flow result
	if feet[i][j] >= 0 {
		return feet[i][j]
	}
	// mark reached
	feet[i][j] = 0
	feet[i][j] = dfs(matrix, feet, i-1, j, matrix[i][j]) | dfs(matrix, feet, i+1, j, matrix[i][j]) |
		dfs(matrix, feet, i, j-1, matrix[i][j]) | dfs(matrix, feet, i, j+1, matrix[i][j])
	dyeing(matrix, feet, i-1, j, matrix[i][j], feet[i][j])
	dyeing(matrix, feet, i+1, j, matrix[i][j], feet[i][j])
	dyeing(matrix, feet, i, j-1, matrix[i][j], feet[i][j])
	dyeing(matrix, feet, i, j+1, matrix[i][j], feet[i][j])
	return feet[i][j]
}

// set same height same value
func dyeing(matrix [][]int, feet [][]int, i, j, l, c int) {
	if i < 0 || j < 0 || i >= len(matrix) || j >= len(matrix[0]) {
		return
	}
	if matrix[i][j] != l {
		return
	}
	if feet[i][j] == c {
		return
	}
	feet[i][j] = c
	dyeing(matrix, feet, i-1, j, l, c)
	dyeing(matrix, feet, i+1, j, l, c)
	dyeing(matrix, feet, i, j-1, l, c)
	dyeing(matrix, feet, i, j+1, l, c)
}