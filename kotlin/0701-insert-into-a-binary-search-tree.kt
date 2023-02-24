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
 
 // Recursive solution (Non self balancing)
class Solution {
    fun insertIntoBST(root: TreeNode?, value: Int): TreeNode? {

        root?: return TreeNode(value)

        if (value > root.value) root.right = insertIntoBST(root.right, value)
        else root.left = insertIntoBST(root.left, value)

        return root
    }

    private val TreeNode.value get() = `val`
}

// Iterative Solution (Non self balancing)
class Solution {
    fun insertIntoBST(root: TreeNode?, value: Int): TreeNode? {

        root?: return TreeNode(value)

        var current = root

        while (current != null) {
            if (value > current!!.value) {
                if (current.right != null){
                    current = current?.right
                } else {
                    current.right = TreeNode(value)
                    break
                }
            } else {
                if (current.left != null){
                    current = current?.left
                } else {
                    current.left = TreeNode(value)
                    break
                }
            }
        }

        return root
    }

    private val TreeNode.value get() = `val`
}
