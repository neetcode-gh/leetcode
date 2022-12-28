class Solution {
    fun permute(nums: IntArray): List<List<Int>> {
        val res = mutableListOf<List<Int>>()
        permute(nums, mutableSetOf<Int>(), mutableListOf<Int>(), res)
        return res
    }

    fun permute(nums: IntArray, set: MutableSet<Int>, list: MutableList<Int>, res: MutableList<List<Int>>) {
        if (list.size == nums.size) {
            res.add(ArrayList(list))
            return
        }

        for (i in 0..nums.size-1) {
            if (!set.contains(nums[i])) {
                list.add(nums[i])
                set.add(nums[i])
                permute(nums, set, list, res)
                list.removeAt(list.size-1)
                set.remove(nums[i])
            }
        }
    }
}