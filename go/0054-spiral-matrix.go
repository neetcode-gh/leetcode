var visited = 200 // -100 <= matrix[i][j] <= 100

func spiralOrder(matrix [][]int) []int {
	n, m := len(matrix[0]), len(matrix)
	x, y, dx, dy := 0, 0, 1, 0
	ans := make([]int, 0)
	for i := 0; i < m*n; i++ {
		if !(0 <= x+dx && x+dx < n) || !(0 <= y+dy && y+dy < m) || matrix[y+dy][x+dx] == visited {
			dx, dy = -dy, dx
		}
		ans = append(ans, matrix[y][x])
		matrix[y][x] = visited
		x, y = x+dx, y+dy
	}
	return ans
}
