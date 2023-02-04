class Solution {
    fun findDisappearedNumbers(nums: IntArray): List<Int> {
        val res = ArrayList<Int>()
        for(i in nums.indices){
            val num = Math.abs(nums[i])
            nums[num-1] = Math.abs(nums[num-1]) * -1
        }
        for((i,v) in nums.withIndex()){
            if(v > 0) res.add(i+1)
        }
        return res
    }
}
