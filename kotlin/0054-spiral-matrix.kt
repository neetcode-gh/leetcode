package kotlin


fun spiralOrder(matrix: Array<IntArray>): List<Int> {
    var res = mutableListOf<Int>()
    var top = 0
    var right = matrix.first().size
    var left = 0
    var bottom = matrix.size

    while (top < bottom && left < right) {

        //get every i in the top row
        for (i in left until right) {
            res.add(matrix[top][i])
        }
        top += 1

        // get every i in the right col
        for (i in top until bottom) {
            res.add(matrix[i][right - 1])
        }
        right -= 1

        if (!(left < right && top < bottom)) {
            break
        }

        //get every i in the bottom row
        for (i in right - 1 downTo left) {
            res.add(matrix[bottom - 1][i])
        }
        bottom -= 1

        //get every i in the left col
        for (i in bottom - 1 downTo top) {
            res.add(matrix[i][left])
        }

        left += 1

    }

    return res

}

fun main() {
    val matrix = arrayOf(intArrayOf(1, 2, 3), intArrayOf(4, 5, 6), intArrayOf(7, 8, 9))
    println(spiralOrder(matrix))
}