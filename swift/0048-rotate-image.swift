class Solution {
    func rotate(_ matrix: inout [[Int]]) {
        var left = 0, right = matrix.count - 1
        
        while left < right {
            for i in 0...right-left-1 {
                let top = left, bottom = right
                
                // save the topLeft
                let topLeft = matrix[top][left + i]
                
                // move bottom left into top left
                matrix[top][left + i] = matrix[bottom - i][left]

                // move bottom right into bottom left
                matrix[bottom - i][left] = matrix[bottom][right - i]

                // move top right into bottom right
                matrix[bottom][right - i] = matrix[top + i][right]

                // move top left into top right
                matrix[top + i][right] = topLeft
            }
            right -= 1
            left += 1
        }
    }
}