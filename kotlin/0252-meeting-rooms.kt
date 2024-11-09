class Solution {
    fun canAttendMeetings(intervals: Array<IntArray>): Boolean {
        if (intervals.isEmpty()) return true
        intervals.sortBy { it.first() }
        var (_, previousEnd) = intervals.first()
        for (i in 1..intervals.lastIndex) {
            val (currentStart, currentEnd) = intervals[i]
            if (currentStart < previousEnd) return false // they are overlapping
            previousEnd = currentEnd
        }
        return true
    }
}