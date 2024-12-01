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
    fun rob(root: TreeNode?): Int {
        root?: return 0

        val res = rob2(root)
        return maxOf(
            res.first,
            res.second
        )
    }

    fun rob2(root: TreeNode?): Pair<Int, Int> {
        root?: return 0 to 0

        val left = rob2(root.left)
        val right = rob2(root.right)

        val with = root.`val` + left.second + right.second
        val without = maxOf(left.first, left.second) + maxOf(right.first, right.second)

        return with to without
    }
}
