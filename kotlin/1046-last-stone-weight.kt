class Solution {
    fun lastStoneWeight(stones: IntArray): Int {
        val heap = PriorityQueue<Int>{a, b -> b-a}

        stones.forEach{ stone ->
            heap.add(stone)
        }

        while (!heap.isEmpty()) {
            if (heap.size == 1)
                return heap.poll()

            val first = heap.poll()
            val sec = heap.poll()

            if (first != sec) {
                heap.add(first - sec)
            }
        }

        return 0
    }
}