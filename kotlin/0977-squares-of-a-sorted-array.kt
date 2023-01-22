class Solution {
    fun sortedSquares(nums: IntArray): IntArray {
        var left = 0; var right = nums.size-1; var end = nums.size-1
        val rArray = IntArray(nums.size)        
        while(left <= right){ // or while(end >= 0)
            val ls = nums[left] * nums[left]
            val rs = nums[right] * nums[right] 
            if(ls > rs){
                rArray[end] = ls
                left++
            }else{
                //rs > ls
                rArray[end] = rs
                right--
            }
            end--
        }
        return rArray
    }
}
