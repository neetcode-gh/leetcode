class Solution {
    func maxAreaOfIsland(_ grid: [[Int]]) -> Int {
        let numRows = grid.count
        let numColumns = grid[0].count
        
        var grid = grid
        var maxArea = 0
        
        for row in 0..<numRows {
            for column in 0..<numColumns {
                guard grid[row][column] == 1 else { continue }
                
                let area = dfs(row: row, column: column, grid: &grid)
                maxArea = max(maxArea, area)
            }
        }
        return maxArea
    }
    
    private func dfs(row: Int, column: Int, grid: inout [[Int]]) -> Int {
        guard row >= 0,
              row < grid.count,
              column >= 0,
              column < grid[0].count,
              grid[row][column] == 1
        else { return 0 }
        
        grid[row][column] = 0
        
        return 1 + dfs(row: row + 1, column: column, grid: &grid)
                 + dfs(row: row - 1, column: column, grid: &grid)
                 + dfs(row: row, column: column + 1, grid: &grid)
                 + dfs(row: row, column: column - 1, grid: &grid)
    }
}
