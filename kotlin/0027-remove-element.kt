class Solution {
    fun removeElement(nums: IntArray, `val`: Int): Int {
        var pointer = 0
        for(n in nums){
            if(n != `val`){
                nums[pointer] = n
                pointer++
            }
        }
        return pointer
    }

}
