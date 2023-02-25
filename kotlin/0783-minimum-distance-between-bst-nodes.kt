/**
 * Example:
 * var ti = TreeNode(5)
 * var v = ti.`val`
 * Definition for a binary tree node.
 * class TreeNode(var `val`: Int) {
 *     var left: TreeNode? = null
 *     var right: TreeNode? = null
 * }
 */
class Solution {

    fun minDiffInBST(root: TreeNode?): Int {

        var res = Integer.MAX_VALUE
        var prev = -1 //Values in range (0 to 10^5)

        fun dfs(root: TreeNode?) {
            if(root == null) return  

            dfs(root.left)
            if(prev != -1) res = minOf(res, root.value - prev) 
            prev = root.value
            dfs(root.right)
        }
        
        dfs(root)
        return res
    }

    val TreeNode.value get() = this.`val`
}
