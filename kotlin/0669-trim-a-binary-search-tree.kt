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
    fun trimBST(root: TreeNode?, low: Int, high: Int): TreeNode? {
        if(root == null)
            return null
        if(root.`val` < low)
            return trimBST(root.right, low, high)
        else if(root.`val` > high)
            return trimBST(root.left, low, high)
        root.left = trimBST(root.left, low, high)
        root.right = trimBST(root.right, low, high)
        return root
    }
}
