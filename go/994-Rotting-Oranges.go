func orangesRotting(grid [][]int) int {
    // queue for BFS
    q := make([][3]int, 0, (len(grid) * len(grid[0]) * len(grid) * len(grid[0])))
    
    for row := 0; row < len(grid); row++ {
        for col := 0; col < len(grid[0]); col++ {
            // If cell isn't a rotten one: nothing interestring here
            if grid[row][col] < 2 {
                continue
            }
            // But if we found rotten one, contamination begins =)
            q = append(q, [3]int{row, col, 0})
            for len(q) > 0 {
                // This is BFS cycle. Look for up, down, left and right neighbours and if they are suitable for contamination.
                // If suitable: add them to the queue
                r, c, distance := q[len(q) - 1][0], q[len(q) - 1][1], q[len(q) - 1][2]
                q = q[:len(q) - 1]
                if grid[r][c] < 0 && grid[r][c] > distance {
                    continue
                }
                // If this cell was already updated with shorter distance: skip it.
                grid[r][c] = distance
                // Check if upper element exists and if it is fresh apple
                if r > 0 && (grid[r - 1][c] == 1 || grid[r - 1][c] < distance - 1) {
                    q = append(q, [3]int{r - 1, c, distance - 1})
                }
                // Check if lower element exists and if it is fresh apple
                if r < len(grid) - 1 && (grid[r + 1][c] == 1 || grid[r + 1][c] < distance - 1) {
                    q = append(q, [3]int{r + 1, c, distance - 1})
                }
                // Check if left element exists and if it is fresh apple
                if c > 0 && (grid[r][c - 1] == 1 || grid[r][c - 1] < distance - 1) {
                    q = append(q, [3]int{r, c - 1, distance - 1})
                }
                // Check if right element exists and if it is fresh apple
                if c < len(grid[0]) - 1 && (grid[r][c + 1] == 1 || grid[r][c + 1] < distance - 1) {
                    q = append(q, [3]int{r, c + 1, distance - 1})
                }

            }            
        }
    }
    maxDistance := 0
    for row := 0; row < len(grid); row++ {
        for col := 0; col < len(grid[0]); col++ {
            switch grid[row][col] {
            case 0:
                continue
            case 1:
                // If there is still untouched fresh apple cell, this cell is inaccesible from any rotten cells
                // and our little contamination fails =(
                return -1
            default:
                if maxDistance > grid[row][col] {
                    maxDistance = grid[row][col]
                }                
            }
        }
    }    
    return -maxDistance    
}