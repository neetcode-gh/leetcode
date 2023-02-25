class Solution {
    
    fun majorityElement(nums: IntArray): Int {
        var res = 0; var count = 0
        for(i in nums.indices){
            val found = nums[i]
            if(count == 0){
                res = found
                count++
            }else if(found == res)
                count++
            else
                count--
        }   
        return res
    }
}
