func numIslands(grid [][]byte) int {
	m, n := len(grid), len(grid[0])
	num_islands := 0

    var dfs func (i int, j int)
    dfs = func (i int, j int) {

		if i < 0 || i >= m { return }
		if j < 0 || j >= n { return }
		if grid[i][j] == '0' { return }

		// Mark as visited so dfs doesn't loop
		grid[i][j] = '0'

        dfs(i - 1, j)
        dfs(i + 1, j)
        dfs(i, j - 1)
        dfs(i, j + 1)
    }

    for i, row := range grid {
        for j, point := range row {
            if point == '1' {
                num_islands++
                dfs(i, j)
            }
        }
    }
    return num_islands
}

