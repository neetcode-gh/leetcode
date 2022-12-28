class Solution {
    fun kClosest(points: Array<IntArray>, k: Int): Array<IntArray> {
        val sorted = points.sortedBy{ it[0]*it[0] + it[1]*it[1]}
        val list = arrayListOf<IntArray>()

        for (i in 0..k-1) {
            list.add(sorted[i])
        }

        return list.toTypedArray()
    }
}