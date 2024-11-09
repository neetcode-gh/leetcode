class Solution {
    fun furthestBuilding(heights: IntArray, bricks: Int, ladders: Int): Int {
        val maxHeap = PriorityQueue<Int> { a, b -> b - a }
        var bricks = bricks
        var ladders = ladders

        for (i in 0 until heights.lastIndex) {
            val diff = heights[i + 1] - heights[i]
            if (diff <= 0) continue

            bricks = bricks - diff
            maxHeap.add(diff)

            if (bricks < 0) {
                if (ladders == 0) return i
                ladders -= 1
                bricks += maxHeap.poll()
            }
        }

        return heights.lastIndex
    }
}
