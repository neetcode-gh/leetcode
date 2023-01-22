class Solution {
    
    func numIslands(_ grid: [[Character]]) -> Int {
        let ROWS = grid.count
        let COLS = grid[0].count
        
        var visited = [[Bool]](
            repeating: [Bool](repeating: false, count: COLS),
            count: ROWS
        )
        var count: Int = 0
        
        // Helper function to check if is within
        func isWithin(row: Int, col: Int) -> Bool {
            return (
                (row >= 0) && (col >= 0) &&
                (row < ROWS) && (col < COLS)
            )
        }
        
        // Helper function to check if cell is land or not
        func isLand(row: Int, col: Int) -> Bool {
            return grid[row][col] == "1"
        }
        
        let movementsX = [-1, 1, 0,  0]
        let movementsY = [0,  0, -1, 1]
        
        // Helper DFS function to 'visit' the grid
        func dfs(row: Int, col: Int) {
            // visit each child
            for (dirX, dirY) in zip(movementsX, movementsY) {
                let rowNew = row + dirX
                let colNew = col + dirY
                
                guard isWithin(row: rowNew, col: colNew) else { continue }
                guard visited[rowNew][colNew] == false else { continue }
                guard isLand(row: rowNew, col: colNew) else { continue }
                
                visited[rowNew][colNew] = true
                dfs(row: rowNew, col: colNew)
            }
        }
        
        for r in 0..<ROWS {
            for c in 0..<COLS {
                guard visited[r][c] == false  else { continue }
                guard isLand(row: r, col: c)  else { continue }
                
                visited[r][c] = true
                dfs(row: r, col: c)
                count += 1
            }
        }
        
        return count
    }
}