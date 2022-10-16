class Solution {
    let dirX: [Int] = [-1, 1, 0, 0]
    let dirY: [Int] = [0, 0, -1, 1]
    
    func exist(_ board: [[Character]], _ word: String) -> Bool {
        let ROWS = board.count
        let COLS = board[0].count
        
        var visited = [[Bool]](
            repeating: [Bool](repeating: false, count: COLS),
            count: ROWS
        )
        
        var wordArr: [Character] = Array(word)
        
        for r in 0..<ROWS {
            for c in 0..<COLS {
                visited[r][c] = true
                
                if dfs(
                    startRow: r, 
                    startCol: c, 
                    &visited, 
                    board, 
                    &wordArr,
                    startIdx: 0
                ) == true {
                    return true
                }
                
                visited[r][c] = false
            }
        }
        
        return false
    }
}

private extension Solution {
    func isWithinBounds(row: Int, col: Int, _ board: [[Character]]) -> Bool {
        ((row >= 0) && (col >= 0) &&
        (row < board.count) && (col < board[0].count))
    }
    
    
    func dfs(
        startRow row: Int, 
        startCol col: Int, 
        _ visited: inout [[Bool]],
        _ board: [[Character]],
        _ wordArr: inout [Character],
        startIdx index: Int
    ) -> Bool {
        let strLen = wordArr.count
        
        // Last index check
        if index == (strLen - 1) {
            return board[row][col] == wordArr[index]
        }
        
        // Edge case
        guard index < strLen else { return false }
        guard board[row][col] == wordArr[index] else { return false }
    
        for (dX, dY) in zip(dirX, dirY) {
            let rowNew = row + dX
            let colNew = col + dY
            
            guard isWithinBounds(row: rowNew, col: colNew, board) else { continue }
            guard visited[rowNew][colNew] == false else { continue }
            
            // Visit
            visited[rowNew][colNew] = true
            
            // Recursive DFS
            if dfs(
                startRow: rowNew, 
                startCol: colNew, 
                &visited, 
                board, 
                &wordArr, 
                startIdx: index + 1
            ) == true {
                return true
            }
            
            // Unvisit [for backtrack]
            visited[rowNew][colNew] = false
        }
        
        return false
    }
}

