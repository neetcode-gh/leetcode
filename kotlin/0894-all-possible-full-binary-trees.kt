class Solution {
    fun allPossibleFBT(n: Int): List<TreeNode?> {
        val memo = HashMap<Int, ArrayList<TreeNode?>>().apply {
            put(0, ArrayList<TreeNode?>())
            put(1, arrayListOf(TreeNode(0)))
        }

        fun dfs(n: Int): ArrayList<TreeNode?> {
            if (memo.contains(n)) return memo[n]!!

            var res = ArrayList<TreeNode?>()
            for (i in 0 until n) {
                val left = dfs(i)
                val right = dfs(n - 1 - i)

                for (n1 in left) {
                    for (n2 in right) {
                        res.add(TreeNode(0, n1, n2))
                    }
                }
            }

            memo[n] = res
            return res
        }

        return dfs(n)
    }
}
