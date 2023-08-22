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
    fun findDuplicateSubtrees(root: TreeNode?): List<TreeNode?> {
        val res = ArrayList<TreeNode?>()
        val subTrees = HashMap<String, Int>()

        fun preOrder(root: TreeNode?): String {
            root?: return "null"
            val s = ",${root.value},${preOrder(root.left)},${preOrder(root.right)}"
            if(subTrees.contains(s)){
                if(subTrees[s] == 1) {
                    res.add(root)
                }
            }
            subTrees[s] = subTrees.getOrDefault(s, 0) + 1       
            return s
        }

        preOrder(root)
        return res
    }

    val TreeNode.value get() = this.`val`
}
