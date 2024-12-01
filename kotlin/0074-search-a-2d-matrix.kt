// binary search on rows to find row, then binary search on actual row O(log(m*n))
class Solution {
    // TC: O(log m + log n)
    fun searchMatrix(matrix: Array<IntArray>, target: Int): Boolean {
        var row = matrix.size
        var col = matrix.first().size
        var top = 0
        var bot = row - 1

        while ( top <= bot ){
            row = (top + bot ) / 2
            if(target > matrix[row][col - 1]){
                top = row + 1
            } else if(target < matrix[row][0]) {
                bot = row - 1
            } else {
                break
            }
        }

        if((top > bot)) return false

        row = (top + bot) / 2
        var l = 0
        var r = col - 1
        while(l <= r){
            var m = (l + r) / 2
            if(target > matrix[row][m]){
                l = m + 1
            } else if(target < matrix[row][m]){
                r = m - 1
            } else {
                return true
            }
        }

        return false
    }
}

//binary search on whole matrix (search the matrix as an sorted array) O(log(m*n))
class Solution {
    fun searchMatrix(mt: Array<IntArray>, t: Int): Boolean {
        val rows = mt.size
        val cols = mt[0].size

        var l = 0
        var r = rows * cols - 1
        while (l != r) {
            val m = (l + r) / 2
            if (mt[m / cols][m % cols] < t)
                l = m + 1
            else
                r = m
        }

        return mt[r / cols][r % cols] == t
    }
}

//treat the matrix as an BST, root at mt[0][-1] O(m + n)
class Solution {
    fun searchMatrix(mt: Array<IntArray>, t: Int): Boolean {
        val rows = mt.size
        val cols = mt[0].size

        var row = 0
        var col = cols - 1
        while (row < rows && col >= 0) {
            val cur = mt[row][col]
            if (cur > t)
                col--
            else if (cur < t)
                row++
            else
                return true
        }

        return false
    }
}
