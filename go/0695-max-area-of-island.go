func maxAreaOfIsland(grid [][]int) int {
	row, col := len(grid), len(grid[0])
	res := 0

	for i := 0; i < row; i++ {
		for j := 0; j < col; j++ {
			if grid[i][j] == 1 {
				curr := dfs(grid, i, j)
				if curr > res {
					res = curr
				}
			}
		}
	}

	return res
}

func dfs(grid [][]int, row, col int) int {
	if row < 0 || row >= len(grid) || col < 0 || col >= len(grid[0]) {
		return 0
	}

	if grid[row][col] == 0 {
		return 0
	}

	grid[row][col] = 0

	return dfs(grid, row+1, col) + dfs(grid, row-1, col) + dfs(grid, row, col+1) + dfs(grid, row, col-1) + 1
}