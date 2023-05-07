class Solution {
    fun zeroFilledSubarray(nums: IntArray): Long {
        var res = 0L
        
        var i = 0
        while(i < nums.size) {
            if(nums[i] == 0) {
                var j = i
                var count = 0L
                while(j < nums.size && nums[j] == 0) {
                    j++
                    count++
                }
                println(count)
                res += count * (1 + count) / 2
                i = j
            }else{
                i++
            }
        }

        return res
    }
}
