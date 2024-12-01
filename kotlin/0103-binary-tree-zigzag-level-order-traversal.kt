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
    fun zigzagLevelOrder(root: TreeNode?): List<List<Int>> {

        val res = ArrayList<ArrayList<Int>>()
        root?: return res

        val q = ArrayDeque<TreeNode?>()
        var left = true

        q.add(root)

        while(q.isNotEmpty()) {
            val s = q.size
            val temp = ArrayList<Int>()
            repeat (s) {
                val x = q.poll()!!
                if(x.left != null) q.add(x.left)
                if(x.right != null) q.add(x.right)
                if(left) temp.add(x.value)
                else temp.add(0, x.value)
            }
            res.add(temp)
            left = !left
        }

        return res
    }

    val TreeNode.value 
        get() = this.`val`
}
