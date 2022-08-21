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
    fun levelOrder(root: TreeNode?): List<List<Int>> {
        val res = mutableListOf<List<Int>>()

        if (root == null)
            return res

        val queue = LinkedList<TreeNode>()
        queue.add(root)

        while (!queue.isEmpty()) {
            val size = queue.size
            val level = mutableListOf<Int>()

            repeat(size) {
                val node = queue.poll()
                level.add(node.`val`)

                if (node.left != null)
                    queue.add(node.left)

                if (node.right != null)
                    queue.add(node.right)
            }

            res.add(level)
        }

        return res
    }
}