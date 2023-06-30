class Solution {
    fun generateMatrix(n: Int): Array<IntArray> {
        var left = 0
        var right = n - 1
        var top = 0
        var bot = n - 1
        var count = 1
        val m = Array(n) { IntArray(n) }

        while (left <= right && top <= bot) {
            for (i in left..right)
                m[top][i] = count++
            top++   

            for (i in top..bot)
                m[i][right] = count++
            right--  

            if (left > right || top > bot)
               break    

            for (i in right downTo left)
                m[bot][i] = count++
            bot--    
                 
            for (i in bot downTo top)
                m[i][left] = count++
            left++
        }

        return m
    }
}
