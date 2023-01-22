package kotlin

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
