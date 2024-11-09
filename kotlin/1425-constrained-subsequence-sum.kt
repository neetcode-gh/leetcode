// Time O(nlogn) and space O(n) using max heap
class Solution {
    fun constrainedSubsetSum(nums: IntArray, k: Int): Int {
        var res = nums[0]
        val maxHeap = PriorityQueue<IntArray>() { a, b -> b[0] - a[0] }
        maxHeap.add(intArrayOf(nums[0], 0))

        for (i in 1 until nums.size) {
            while (i - maxHeap.peek()[1] > k)
                maxHeap.poll()

            var curMax = maxOf(nums[i], nums[i] + maxHeap.peek()[0])
            res = maxOf(res, curMax)
            maxHeap.add(intArrayOf(curMax, i))
        }

        return res
    }
}

// Time O(n) and space O(n) using monotonic array/list
class Solution {
    fun constrainedSubsetSum(nums: IntArray, k: Int): Int {
        var win = LinkedList<Int>()

        var res = Integer.MIN_VALUE
        for (i in 0 until nums.size) {
            nums[i] += (win.peekFirst() ?: 0)
            res = maxOf(res, nums[i])

            while (win.isNotEmpty() && win.peekLast() < nums[i])
                win.removeLast()
            if (nums[i] > 0)
                win.addLast(nums[i])
            if (i >= k && win.isNotEmpty() && win.peekFirst() == nums[i - k])
                win.removeFirst()
        }

        return res
    }
}
