package kotlin

class Solution {
    fun singleNumber(nums: IntArray): Int {
        var res = 0
        
        for(n in nums){
            res = res xor n
        }
        return res
    }
}
