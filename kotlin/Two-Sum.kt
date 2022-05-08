package kotlin

class Solution {
    fun twoSum(nums: IntArray, target: Int): IntArray {
        val prevMap: HashMap<Int, Int> = HashMap()
        for (i in nums.indices) {
            val num = nums[i]
            val diff = target - num
            if (prevMap.containsKey(diff)) {
                return intArrayOf(prevMap[diff]!!, i)
            }
            prevMap[num] = i
        }
        return intArrayOf()
    }
}