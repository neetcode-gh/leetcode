class Solution {
    fun generateTrees(n: Int): List<TreeNode?> {
        val dp = HashMap<Pair<Int, Int>, List<TreeNode?>>()
        
        fun generate(l: Int, r: Int): List<TreeNode?> {
            if (l == r) return arrayListOf(TreeNode(l))
            if (l > r) return arrayListOf<TreeNode?>(null)
            if (dp[l to r] != null) return dp[l to r]!!
            
            val res = ArrayList<TreeNode?>()
            for (i in l..r) {
                val left = generate(l, i - 1)
                val right = generate(i + 1, r)
                for (nodeLeft in left) {
                    for (nodeRight in right) {
                        val root = TreeNode(i, nodeLeft, nodeRight)
                        res.add(root)
                    }
                }
            }

            dp[l to r] = res
            return res
        }

        return generate(1, n)
    }
}
