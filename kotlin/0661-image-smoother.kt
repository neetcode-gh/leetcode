// O(n * m) time and O(n * m) space
class Solution {
    fun imageSmoother(img: Array<IntArray>): Array<IntArray> {
        val n = img.size
        val m = img[0].size
        val dirs = arrayOf(
            intArrayOf(0, 1),
            intArrayOf(0, -1),
            intArrayOf(1, 0),
            intArrayOf(-1, 0),
            intArrayOf(-1, -1),
            intArrayOf(1, 1),
            intArrayOf(-1, 1),
            intArrayOf(1, -1)
        )

        val res = Array (n) { IntArray (m) }
        for (i in 0 until n) {
            for (j in 0 until m) {
                var count = 1
                var sum = img[i][j]
                for (dir in dirs) {
                    val i2 = i + dir[0]
                    val j2 = j + dir[1]
                    if (i2 in (0 until n) && j2 in (0 until m)) {
                        count++
                        sum += img[i2][j2]
                    }
                }
                res[i][j] = sum / count
            }
        }

        return res
    }
}

// O(n * m) time and O(1) space
class Solution {
    fun imageSmoother(img: Array<IntArray>): Array<IntArray> {
        val n = img.size
        val m = img[0].size
        val dirs = arrayOf(
            intArrayOf(0, 1),
            intArrayOf(0, -1),
            intArrayOf(1, 0),
            intArrayOf(-1, 0),
            intArrayOf(-1, -1),
            intArrayOf(1, 1),
            intArrayOf(-1, 1),
            intArrayOf(1, -1)
        )

        for (i in 0 until n) {
            for (j in 0 until m) {
                var count = 1
                var sum = img[i][j]
                for (dir in dirs) {
                    val i2 = i + dir[0]
                    val j2 = j + dir[1]
                    if (i2 in (0 until n) && j2 in (0 until m)) {
                        count++
                        sum += img[i2][j2] and 0xFF
                    }
                }
                img[i][j] = img[i][j] or ((sum / count) shl 8)
            }
        }

        for (i in 0 until n) {
            for (j in 0 until m) {
                img[i][j] = img[i][j] shr 8
            }
        }

        return img
    }
}
