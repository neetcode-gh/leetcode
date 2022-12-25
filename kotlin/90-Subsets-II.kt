class Solution {
    fun subsetsWithDup(nums: IntArray): List<List<Int>> {
        nums.sort()
        val resultantList = mutableListOf<List<Int>>()
        val intermediaryList = mutableListOf<Int>()

        fun dfs(decisionIndex: Int = 0) {
            if (decisionIndex > nums.lastIndex) {
                resultantList.add(intermediaryList.toList())
                return
            }

            // decision to include nums[decisionIndex]
            intermediaryList.add(nums[decisionIndex])
            dfs(decisionIndex + 1)

            // decision to not include nums[decisionIndex]
            intermediaryList.removeAt(intermediaryList.lastIndex)
            // skipping duplicates if any
            var i = decisionIndex
            while ((i in nums.indices && i + 1 in nums.indices) && nums[i] == nums[i + 1]) i++
            dfs(i + 1)
        }
        dfs()
        return resultantList
    }
}