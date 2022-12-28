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
    fun buildTree(preorder: IntArray, inorder: IntArray): TreeNode? {
        val prStart = 0; val inStart = 0
        val prEnd = preorder.size-1; val inEnd = inorder.size-1

        return helper(preorder, prStart, prEnd, inorder, inStart, inEnd);
    }

    fun helper(preorder: IntArray, prStart: Int, prEnd: Int, inorder: IntArray, inStart: Int, inEnd: Int): TreeNode? {
        if (prStart > prEnd || inStart > inEnd)
            return null

        val root = TreeNode(preorder[prStart])
        var i = 0

        while (i < inorder.size && inorder[i] != preorder[prStart]) {
            i++
        }

        root.left = helper(preorder, prStart+1, prStart-inStart+i, inorder, inStart, i-1)
        root.right = helper(preorder, prStart-inStart+i+1, prEnd, inorder, i+1, inEnd)

        return root
    }
}