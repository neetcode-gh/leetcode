/**
 * Definition for a binary tree node.
 * class TreeNode(var `val`: Int = 0) {
 *     var left: TreeNode? = null
 *     var right: TreeNode? = null
 * }
 */

class Solution {
    fun lowestCommonAncestor(root: TreeNode?, p: TreeNode?, q: TreeNode?): TreeNode? {
        if (p!!.`val` > root!!.`val` && q!!.`val` > root!!.`val`) {
            return lowestCommonAncestor(root.right, p, q)
        }

        if (p!!.`val` < root!!.`val` && q!!.`val` < root!!.`val`) {
            return lowestCommonAncestor(root.left, p, q)
        }

        return root
    }
}