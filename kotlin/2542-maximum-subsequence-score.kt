class Solution {
    fun maxScore(nums1: IntArray, nums2: IntArray, k: Int): Long {
        val nums = nums1.zip(nums2).sortedWith(compareBy({ -it.second }))
        val minHeap = PriorityQueue<Int>()

        var sum = 0L
        var res = 0L
        for ((n1, n2) in nums) {
            sum += n1
            minHeap.add(n1)

            if (minHeap.size > k) 
                sum -= minHeap.poll()
            if (minHeap.size == k)
                res = maxOf(res, sum * n2)
        }

        return res
    }
}
