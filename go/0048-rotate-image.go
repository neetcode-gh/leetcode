func rotate(matrix [][]int)  {
    left, right := 0, len(matrix) - 1
    for left < right {
        for i := 0; i < right - left; i++ {
            top, bottom := left, right
            
            // save the topleft
            topLeft := matrix[top][left + i]

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