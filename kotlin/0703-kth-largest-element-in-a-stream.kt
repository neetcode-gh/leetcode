class KthLargest(private val k: Int, nums: IntArray) {
    private val minHeap = PriorityQueue<Int>()

    init{
        with (minHeap) {
            for (num in nums) add(num)
            while (size > k) poll()
        }
    }

    fun add(`val`: Int): Int {
        with (minHeap) {
            add(`val`)
            if(size > k) poll()
            return peek()
        }
    }
}
