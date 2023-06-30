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
    fun buildTree(inorder: IntArray, postorder: IntArray): TreeNode? {
        val inOrdIdx = HashMap<Int, Int>().apply{
            for((i,v) in inorder.withIndex())
                this[v] = i
        }

        var pstOrdIdx = postorder.lastIndex

        fun helper(left: Int, right: Int): TreeNode? {
            if(left > right)
                return null
        
            val root = TreeNode(postorder[pstOrdIdx])
            pstOrdIdx--

            val index = inOrdIdx[root.value]!!
            root.right = helper(index + 1, right)
            root.left = helper(left, index - 1)
            return root
        }
        
        return helper(0, postorder.lastIndex)
    }

    val TreeNode.value get()= this.`val`
}
