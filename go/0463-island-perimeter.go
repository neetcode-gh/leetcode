func islandPerimeter(grid [][]int) int {
    ROWS, COLS := len(grid), len(grid[0])
    visit := make(map[int]bool)
    
    var dfs func(int, int) int
    dfs = func(i, j int) int {
        if i >= ROWS || j >= COLS || i < 0 || j < 0 || grid[i][j] == 0 {
            return 1
        } else if visit[i*COLS + j] {
            return 0
        }
        
        visit[i*COLS + j] = true
        perim := dfs(i, j + 1)
        perim += dfs(i + 1, j)
        perim += dfs(i, j - 1)
        perim += dfs(i - 1, j)
        return perim
    }
    
    for i := 0; i < ROWS; i++ {
        for j := 0; j < COLS; j++ {
            if grid[i][j] != 0 {
                return dfs(i, j)
            }
        }
    }
    return -1
}
