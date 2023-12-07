class Solution {
    fun minInterval(intervals: Array<IntArray>, _queries: IntArray): IntArray {
        intervals.sortWith(compareBy( {it[0]}, { it[1]}))
        val queries = _queries.withIndex().sortedBy { it.value }
        val minHeap = PriorityQueue<IntArray> (compareBy( { it[0] }, { it[1] }))
        val res = IntArray (queries.size)

        var i = 0
        queries.forEach { (idx, q) ->
            while (i < intervals.size && intervals[i][0] <= q) {
                val (l, r) = intervals[i]
                minHeap.add(intArrayOf(r - l + 1, r))
                i++
            }

            while (minHeap.isNotEmpty() && minHeap.peek()[1] < q)
                minHeap.poll()
            
            res[idx] = if (minHeap.isEmpty()) -1 else minHeap.peek()[0]
        }

        return res
    }
}
