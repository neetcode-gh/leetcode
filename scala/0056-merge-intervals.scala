import scala.collection.mutable.ArrayBuffer

object Solution {
    def merge(intervals: Array[Array[Int]]): Array[Array[Int]] = {
        val (start, end) = (0, 1)
        val sortedIntervals = intervals.sortBy(_(start))
        val res = ArrayBuffer[Array[Int]](sortedIntervals(0))
        
        for (i <- 1 until sortedIntervals.length) {
            val currEndIdx = res.size - 1
            val currEnd = res(currEndIdx)
            val curr = sortedIntervals(i)
            
            if (currEnd(end) < curr(start)) {
                res += curr
            } else {
                res(currEndIdx)(end) = currEnd(end).max(curr(end))
            }
        }
        
        return res.toArray
    }
}