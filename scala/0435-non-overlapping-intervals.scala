object Solution {
    def eraseOverlapIntervals(intervals: Array[Array[Int]]): Int = {
        val (start, end) = (0, 1)
        val sortedIntervals = intervals.sortBy(_(0))
        
        var numRemovals = 0
        var currEnd = sortedIntervals(0)(end)
        
        for (i <- 1 until sortedIntervals.length) {
            val currInterval = sortedIntervals(i)
            
            if (currInterval(start) < currEnd) {
                numRemovals += 1
                currEnd = currEnd.min(currInterval(end))
            } else {
                currEnd = currInterval(end)
            }
        }
        
        numRemovals
    }
}