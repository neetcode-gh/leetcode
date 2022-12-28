class Solution {
    fun merge(intervals: Array<IntArray>): Array<IntArray> {
        intervals.sortBy{ it.first() }
        val list = LinkedList<IntArray>()

        for (interval in intervals) {
            if (list.size == 0 || list.last[1] < interval[0]) {
                list.add(interval)
            } else {
                list.last[1] = Math.max(list.last[1], interval[1])
            }
        }

        return list.toTypedArray()
    }
}