class Solution {
    fun combinationSum2(candidates: IntArray, target: Int): List<List<Int>> {
        val res = mutableListOf<List<Int>>()
        candidates.sort()
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
            if (i == idx || nums[i] != nums[i-1]) {
                list.add(nums[i])
                dfs(nums, target - nums[i], i+1, list, res)
                list.removeAt(list.size-1)
            }
        }
    }
}