func countSubIslands(grid1 [][]int, grid2 [][]int) int {
    ROWS, COLS := len(grid1), len(grid1[0])
    visit := make(map[int]bool)
    
    var dfs func(int, int) bool
    dfs = func(r, c int) bool {
        if (
            r < 0 ||
            c < 0 ||
            r == ROWS ||
            c == COLS ||
            grid2[r][c] == 0 ||
            visit[r*COLS + c]) {
            return true
        }
        
        visit[r*COLS + c] = true
        res := true
        if grid1[r][c] == 0 {
            res = false
        }
        
        res = dfs(r - 1, c) && res
        res = dfs(r + 1, c) && res
        res = dfs(r, c - 1) && res
        res = dfs(r, c + 1) && res
        return res
    }
    
    count := 0
    for r := 0; r < ROWS; r++ {
        for c := 0; c < COLS; c++ {
            if grid2[r][c] != 0 && !visit[r*COLS + c] && dfs(r, c) {
                count += 1
            }
        }
    }
    return count
}
