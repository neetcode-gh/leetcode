class Solution {
    fun lastStoneWeight(stones: IntArray): Int {
        val maxHeap = PriorityQueue<Int>{ x, y -> y - x }

        return maxHeap.run {
            for (stone in stones) add(stone)

            while (size > 1) {
                val y = poll()
                val x = poll()

                if (y != x) add(y - x)
            }

            if (size == 1) peek() else 0
        }
    }
}