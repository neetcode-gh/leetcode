class Solution {
	fun maxSlidingWindow(nums: IntArray, k: Int): IntArray {
		if (nums.isEmpty() || k == 0) {
			return intArrayOf()
		}
		var i = 0
		val queue = arrayListOf<Int>()
		val array = IntArray(nums.size - k + 1)
		var slideIndex = 0

		while (i < nums.size) {
			/**
			 * remove head if it is out of range of the sliding window
			 */
			if (queue.isNotEmpty() && i - queue[0] == k) {
				queue.removeAt(0)
			}

			/**
			 * remove from the tail if it's smaller than nums[i]
			 */
			var j = queue.size - 1
			while (queue.isNotEmpty() && j >= 0 && nums[queue[j]] < nums[i]) {
				queue.removeAt(queue.size - 1)
				j --
			}

			queue.add(i)
			if (i - k + 1 >= 0) {
				array[slideIndex ++] = nums[queue[0]]
			}

			i++
		}

		return array
	}
}