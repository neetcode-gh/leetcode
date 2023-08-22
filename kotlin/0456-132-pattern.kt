class Solution {
    fun find132pattern(nums: IntArray): Boolean {
        val stack = LinkedList<Pair<Int, Int>>()
        var min = nums[0]

        for (i in 1 until nums.size) {
            while (stack.isNotEmpty() && stack.peekLast().first <= nums[i])
                stack.removeLast()
            if (stack.isNotEmpty() && stack.peekLast().second < nums[i])
                return true
            stack.addLast(nums[i] to min)
            min = minOf(min, nums[i])
        }

        return false
    }
}
