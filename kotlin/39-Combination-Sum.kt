class Solution {
    fun combinationSum(candidates: IntArray, target: Int): List<List<Int>> {
        val res = mutableListOf<List<Int>>()
        dfs(candidates, target, 0, mutableListOf<Int>(), res)
        return res
    }

    fun dfs(nums: IntArray, target: Int, idx: Int, list: MutableList<Int>, res: MutableList<List<Int>>) {

        if (target == 0) {
            res.add(ArrayList(list))
            return
        }

        if (idx >= nums.size || target < 0)
            return

        for (i in idx..nums.size-1) {
            list.add(nums[i])
            dfs(nums, target - nums[i], i, list, res)
            list.removeAt(list.size-1)
        }
    }
}