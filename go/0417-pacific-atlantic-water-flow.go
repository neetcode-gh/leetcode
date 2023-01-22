func pacificAtlantic(heights [][]int) [][]int {
    ROWS, COLS := len(heights), len(heights[0])
    pac, atl := make(map[int]bool), make(map[int] bool)
    
    var dfs func(int, int, map[int]bool, int)
    dfs = func(r, c int, visit map[int]bool, prevHeight int) {
        if (
            visit[r*COLS + c] ||
            r < 0 ||
            c < 0 ||
            r == ROWS ||
            c == COLS ||
            heights[r][c] < prevHeight) {
            return;
        }
        visit[r*COLS + c] = true
        dfs(r + 1, c, visit, heights[r][c])
        dfs(r - 1, c, visit, heights[r][c])
        dfs(r, c + 1, visit, heights[r][c])
        dfs(r, c - 1, visit, heights[r][c])
    }
    
    for c := 0; c < COLS; c++ {
        dfs(0, c, pac, heights[0][c])
        dfs(ROWS - 1, c, atl, heights[ROWS - 1][c])
    }
    
    for r := 0; r < ROWS; r++ {
        dfs(r, 0, pac, heights[r][0])
        dfs(r, COLS - 1, atl, heights[r][COLS - 1])
    }
    
    res := make([][]int, 0)
    for r := 0; r < ROWS; r++ {
        for c := 0; c < COLS; c++ {
            if pac[r*COLS + c] && atl[r*COLS + c] {
                res = append(res, []int{r, c})
            }
        }
    }
    return res
}
