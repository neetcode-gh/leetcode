class Solution {
    func searchMatrix(_ matrix: [[Int]], _ target: Int) -> Bool {
        let ROWS = matrix.count
        let COLS = matrix[0].count
        
        var row = ROWS - 1
        var col = 0
        
        while row >= 0 && col < COLS {
            let number = matrix[row][col]
            
            if number == target {
                return true
            }
            
            if number > target {
                row -= 1    // go up                
            }
            else {
                col += 1    // go right                
            }
        }
    
        return false
    }
}
