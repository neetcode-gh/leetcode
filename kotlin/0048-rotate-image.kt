class Solution {
    fun rotate(matrix: Array<IntArray>): Unit {
        var left = 0; var right = matrix.size-1
        while (left < right){
            for(i in 0..(right-left)-1){
                val top = left; val bot = right
                val topleft = matrix[top][left+i]
                matrix[top][left+i] = matrix[bot-i][left]
                matrix[bot-i][left] = matrix[bot][right-i]
                matrix[bot][right-i] = matrix[top+i][right]   
                matrix[top+i][right] = topleft
            }
            left++
            right--
        }
    }
}
