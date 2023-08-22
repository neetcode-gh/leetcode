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
    fun hasPathSum(root: TreeNode?, targetSum: Int): Boolean {
        
        root?: return false

        if(root.left == null && root.right == null) return targetSum - root.value == 0
        else return hasPathSum(root.left, targetSum - root.value) || hasPathSum(root.right, targetSum - root.value)
    }

    val TreeNode.value get() = this.`val`
}
