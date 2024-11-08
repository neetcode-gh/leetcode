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
    fun isCompleteTree(root: TreeNode?): Boolean {

        val q = LinkedList<TreeNode?>().apply{
            this.addFirst(root)
        }

        while(q.isNotEmpty()) {
            val node = q.removeLast()

            if(node != null) {
                q.addFirst(node.left)
                q.addFirst(node.right)
            } else {
                while(q.isNotEmpty()) {
                    if(q.removeLast() != null)
                        return false
                }
            }
        }

        return true
    }
}
