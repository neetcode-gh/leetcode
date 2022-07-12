class Solution {
    fun containsDuplicate(nums: IntArray): Boolean {
        val set = mutableSetOf<Int>()
        for (num in nums){
            if(set.contains(num)){
                return true
            }
            set.add(num)
        }
        return false
    }
}
