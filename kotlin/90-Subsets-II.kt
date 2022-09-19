class Solution {
    fun subsetsWithDup(nums: IntArray): List<List<Int>> {
        val res = mutableListOf<List<Int>>()
        Arrays.sort(nums)
        subsets(nums, 0, mutableListOf<Int>(), mutableSetOf<List<Int>>(), res)
        return res
    }

    fun subsets(nums: IntArray, idx: Int, list: MutableList<Int>, set: MutableSet<List<Int>>, res: MutableList<List<Int>>) {
        val copy = ArrayList(list)

        if (set.add(copy))
            res.add(copy)

        for (i in idx..nums.size-1) {
            list.add(nums[i])
            subsets(nums, i+1, list, set, res)
            list.removeAt(list.size-1)
        }
    }
}