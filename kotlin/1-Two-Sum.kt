class Solution {
    fun twoSum(nums: IntArray, target: Int): IntArray {
        var hashMap = HashMap<Int, Int> ()
        nums.forEachIndexed { index, num -> 
            var match:Int = target - num 
            if (hashMap.containsKey(match)) {
                return intArrayOf(hashMap[match]!!, index)
            }
            hashMap[num] = index
        }
        return intArrayOf()
    }
}