class Solution {
    fun eraseOverlapIntervals(intervals: Array<IntArray>): Int {
        val sorted = intervals.sortedBy { it[1] }

        var res = 0
        var end = -50000
        for ((s, e) in sorted) {
            if (s >= end) 
                end = e
            else
                res++
        }

        return res
    }
}
