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
    fun goodNodes(root: TreeNode?): Int {
        return goodNodes(root, root!!.`val`)
    }

    fun goodNodes(node: TreeNode?, parent: Int): Int {
        if (node == null)
            return 0;

        val res = if (parent > node.`val`) 0 else 1;

        val max = Math.max(parent, node.`val`);

        val left = goodNodes(node.left, max);
        val right = goodNodes(node.right, max);

        return res + left + right;
    }
}