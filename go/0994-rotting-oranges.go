const ROW = 0
const COL = 1
func orangesRotting(grid [][]int) int {
    q := make([][]int, 0)
    fresh := 0
    time := 0
    
    for r := 0; r < len(grid); r++ {
        for c := 0; c < len(grid[0]); c++ {
            if grid[r][c] == 1 {
                fresh += 1
            }
            if grid[r][c] == 2 {
                q = append(q, []int{r, c})
            }
        }
    }
    
    directions := [4][2]int{{0, 1}, {0, -1}, {1, 0}, {-1, 0}}
    for fresh > 0 && len(q) != 0 {
        length := len(q)
        for i := 0; i < length; i++ {
            cell := q[0]
            q = q[1:]
            
            for _, d := range directions {
                row, col := cell[ROW] + d[ROW], cell[COL] + d[COL]

                // if in bounds and notrotten, make rotten
                // and add to q
                if(
                    row >= 0 && row < len(grid) &&
                    col >= 0 && col < len(grid[0]) &&
                    grid[row][col] == 1) {
                    grid[row][col] = 2
                    q = append(q, []int{row, col})
                    fresh -= 1
                }
            }         
        }
        time += 1
    }
    
    if fresh == 0 {
        return time;
    }
    return -1
}
