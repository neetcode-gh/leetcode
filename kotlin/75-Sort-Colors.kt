class Solution {
    fun sortColors(nums: IntArray): Unit {
        
        var low = 0
        var high = nums.size-1
        var pointer = 0
        
        while(pointer <= high){
            when(nums[pointer]){
                0 -> {
                    swap(low,pointer,nums)
                    low++
                    pointer++
                }
                1 -> {
                    pointer++
                }
                2 -> {
                    swap(high,pointer,nums)
                    high--
                }
            }
        }
    }
    
    private fun swap(i: Int, j: Int, nums: IntArray){
        val temp = nums[i]
        nums[i] = nums[j]
        nums[j] = temp
    }  
}