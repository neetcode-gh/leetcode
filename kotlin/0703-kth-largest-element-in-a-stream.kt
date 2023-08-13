 class KthLargest(val k: Int, val nums: IntArray) {
    val minHeap = PriorityQueue<Int>()

    init{
        for (num in nums)
            minHeap.add(num)
        while (minHeap.size > k)
            minHeap.poll()
    }

    fun add(`val`: Int): Int {
        minHeap.add(`val`)
        if (minHeap.size > k)
            minHeap.poll()
        return minHeap.peek()
    }

}
