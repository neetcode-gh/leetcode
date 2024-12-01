class Solution {
    fun fourSum(nums: IntArray, target: Int): List<List<Int>> {
        nums.sort()
        val res = ArrayList<ArrayList<Int>>()
        val temp = ArrayList<Int>()

        fun kSum(k: Int, start: Int, targetSum: Long) {
            if (k != 2) {
                for (i in start..(nums.size - k)) {
                    if (i > start && nums[i - 1] == nums[i])
                        continue 
                    
                    temp.add(0, nums[i])
                    kSum(k - 1, i + 1, targetSum - nums[i])
                    temp.removeAt(0)
                }

                return
            }
            
            var left = start
            var right = nums.lastIndex
            while (left < right) {       
                val sum = nums[left].toLong() + nums[right].toLong()
                if (sum < targetSum) {
                    left++
                } else if (sum > targetSum) {
                    right--
                } else {
                    temp.add(0, nums[left])
                    temp.add(0, nums[right])
                    res.add(ArrayList(temp))
                    temp.removeAt(0)
                    temp.removeAt(0)
                    
                    left++
                    while (left < right && nums[left - 1] == nums[left])
                        left++
                }
            }
        }

        kSum(4, 0, target.toLong())
        return res
    }
}
