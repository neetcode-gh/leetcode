import java.util.*

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
    fun maxDepth(root: TreeNode?): Int {
        if (root == null)
            return 0

        val left = maxDepth(root.left)
        val right = maxDepth(root.right)

        return 1 + Math.max(left, right)
    }

    fun iterativeMaxDepth(root: TreeNode?): Int {
        if (root == null) return 0
        val callStack = Stack<Pair<TreeNode, Int>>().apply { add(Pair(root, 1)) }
        var currentMaxDepth = 1
        var temp: Pair<TreeNode, Int>
        while (callStack.isNotEmpty()) {
            temp = callStack.pop()
            currentMaxDepth = maxOf(currentMaxDepth, temp.second)
            with(temp.first) {
                left?.let { callStack.add(Pair(it, currentMaxDepth + 1)) }
                right?.let { callStack.add(Pair(it, currentMaxDepth + 1)) }
            }
        }
        return currentMaxDepth
    }
}