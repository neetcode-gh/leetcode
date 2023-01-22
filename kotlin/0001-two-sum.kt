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

fun main() {
    val result = Solution().twoSum(intArrayOf(2, 7, 11, 15), 9)
    println(result.contentToString())
}
