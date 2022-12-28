class Solution {

	fun search(nums: IntArray, target: Int): Int {
		if (nums.isEmpty()) {
			return -1
		}
		return separate(nums, target, 0, nums.size - 1)
	}

	fun separate(nums: IntArray, target: Int, from: Int, end: Int): Int {
		var index = (end - from) / 2 + from
		if (nums[index] == target) {
			return index
		}
		if (from == end) {
			return -1
		}

		val curIndex = if (nums[index] > nums[0] && nums[index] > target  && nums[0] <= target
				||  nums[index] < nums[0] && (target < nums[index]  || target >= nums[0])) {
			separate(nums, target, from, index)
		} else {
			separate(nums, target, index + 1, end)
		}
		return curIndex
	}
}