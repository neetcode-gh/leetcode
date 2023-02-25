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

//recursive solution
class Solution {
    fun deleteNode(root: TreeNode?, key: Int): TreeNode? {
        
        root?: return null

        if (root.value < key) {
            root.right = deleteNode(root.right, key)
        } else if (root.value > key) {
            root.left = deleteNode(root.left, key)
        } else {
            if (root.right == null) return root.left
            if (root.left == null) return root.right

            var current = root.right
            while (current.left != null) current = current.left
            root.`val` = current.value
            root.right = deleteNode(root.right, root.value)
        }

        return root
    }

    private val TreeNode.value get() = `val`
}
