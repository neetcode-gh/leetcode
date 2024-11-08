/*
* Can be generalized to repeat(x) easier
*/
class Solution {
    fun getConcatenation(nums: IntArray): IntArray {
        val ans = LinkedList<Int>()
        repeat(2) {
            for(num in nums)
                ans.addLast(num)
        }
        return ans.toIntArray()
    }
}

/*
* concrete solution
*/
class Solution {
    fun getConcatenation(nums: IntArray): IntArray {
        val ans = IntArray(nums.size * 2)
        for(i in 0..nums.lastIndex) {
            ans[i] = nums[i]
            ans[i + nums.size] = nums[i]
        }
        return ans
    }
}
