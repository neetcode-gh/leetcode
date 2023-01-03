/**
 * Definition for a binary tree node.
 * class TreeNode(_value: Int = 0, _left: TreeNode = null, _right: TreeNode = null) {
 *   var value: Int = _value
 *   var left: TreeNode = _left
 *   var right: TreeNode = _right
 * }
 */
object Solution {
    def kthSmallest(root: TreeNode, k: Int): Int = {
        helper(root, k)._2
    }

    // Recursive in-order traversal.
    def helper(root: TreeNode, k: Int): (Boolean, Int, Int) = {
        if (root == null) {
            return (false, 0, 0)
        }

        val (isInLeft, lVal, lSize) = helper(root.left, k)
        if (isInLeft) {
            return (true, lVal, 0)
        } else {
            if (k - lSize == 1) {
                return (true, root.value, 0)
            } else {
                val (isInRight, rVal, rSize) = helper(root.right, k - (lSize + 1))
                if (isInRight) {
                    return (true, rVal, 0)
                } else {
                    return (false, 0, lSize + rSize + 1)
                }
            }
        }
    }
}