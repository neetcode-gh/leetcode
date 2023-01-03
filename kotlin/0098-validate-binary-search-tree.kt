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
    fun isValidBST(root: TreeNode?): Boolean {
        return isValidBST(root, null, null)
    }

    fun isValidBST(node: TreeNode?, left: Int?, right : Int?): Boolean {
        if (node == null)
            return true

        if (left != null && node.`val` <= left || right != null && node.`val` >= right)
            return false

        return isValidBST(node.left, left, node.`val`) && isValidBST(node.right, node.`val`, right)
    }
}