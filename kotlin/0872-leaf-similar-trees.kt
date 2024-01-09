class Solution {
    fun leafSimilar(root1: TreeNode?, root2: TreeNode?): Boolean {

        fun dfs(root: TreeNode?, res: MutableList<Int>) {
            root?: return

            if (root.left == null && root.right == null)
                res.add(root.`val`)
            
            dfs(root.left, res)
            dfs(root.right, res)
        }

        val res1: MutableList<Int> = mutableListOf()
        val res2: MutableList<Int> = mutableListOf()
        
        dfs(root1, res1)
        dfs(root2, res2)

        return res1 == res2
    }
}
