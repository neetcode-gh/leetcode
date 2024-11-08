class Solution {
    fun sumNumbers(root: TreeNode?): Int {
        var res = 0

        fun dfs(root: TreeNode?, current: Int) {
            root?: return

            var new = current * 10
            new += root.value

            if(root.left == null && root.right == null) {
                res += new
                return
            }

            dfs(root.left, new)
            dfs(root.right, new)
        }
        
        dfs(root, 0)
        return res
    }

    val TreeNode.value get()= this.`val`
}
