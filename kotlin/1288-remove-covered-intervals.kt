// Time complexity O(nlogn) and space complexity O(n)
// Find solution with optimized space complexity below
class Solution {
    fun removeCoveredIntervals(intervals: Array<IntArray>): Int {
        intervals.sortWith(compareBy({ it[0] }, { -it[1] }))

        val res = LinkedList<IntArray>().apply { add(intervals[0]) }
        for ((l, r) in intervals) {
            val (prevL, prevR) = res.peekLast()

            if (prevL <= l && prevR >= r)
                continue
            
            res.addLast(intArrayOf(l, r))
        }

        return res.size
    }
}

// Time complexity O(nlogn) and space complexity O(1)
class Solution {
    fun removeCoveredIntervals(intervals: Array<IntArray>): Int {
        intervals.sortWith(compareBy({ it[0] }, { -it[1] }))

        var prev = intervals[0]
        var res = 1
        for (interval in intervals) {
            if (prev[0] <= interval[0] && prev[1] >= interval[1])
                continue
            
            prev = interval
            res++
        }

        return res
    }
}
