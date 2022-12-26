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
    fun rightSideView(root: TreeNode?): List<Int> {
        val res = mutableListOf<Int>()

        if (root == null)
            return res

        val queue = LinkedList<TreeNode>()
        queue.add(root)

        while (!queue.isEmpty()) {
            val size = queue.size

            for (i in 0..size-1) {
                val node = queue.poll()

                if (i == size-1)
                    res.add(node.`val`)

                if (node.left != null)
                    queue.add(node.left)

                if (node.right != null)
                    queue.add(node.right)
            }
        }

        return res
    }
}