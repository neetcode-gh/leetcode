class Solution {
    fun moveZeroes(nums: IntArray): Unit {
        var l = 0
        for(r in 0 until nums.size) {
            if(nums[r] != 0){
                nums.swap(l,r)
                l++
            } 
        }
        return
    }
    fun IntArray.swap(i: Int, j: Int) {
        this[i] = this[j].also{this[j] = this[i]}
    }
}
