class Solution {
    fun minMeetingRooms(intervals: Array<IntArray>): Int {
        val startTimes = intervals.map { it.first() }.sorted()
        val endTimes = intervals.map { it.last() }.sorted()
        var (startIndex, endIndex) = Pair(0, 0)
        var minMeetingRooms = 0
        while (startIndex in startTimes.indices) {
            if (startTimes[startIndex] < endTimes[endIndex]) {
                minMeetingRooms++
                startIndex++
            } else {
                startIndex++
                endIndex++
            }
        }
        return minMeetingRooms
    }
}