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
    fun mergeTrees(root1: TreeNode?, root2: TreeNode?): TreeNode? {

        if(root1 == null && root2 == null) return null

        var newNode: TreeNode? = null
        var val1 = if(root1 != null) root1.value else 0
        var val2 = if(root2 != null) root2.value else 0

        newNode = TreeNode(val1 + val2)
        newNode.left = mergeTrees(root1?.left ?: null, root2?.left ?: null)
        newNode.right = mergeTrees(root1?.right ?: null, root2?.right ?: null)
        
        return newNode
    }

    val TreeNode.value get() = this.`val`
}
