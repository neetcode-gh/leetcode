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
    fun isSubtree(s: TreeNode?, t: TreeNode?): Boolean {
        if (s == null)
            return false

        return equals(s, t) || isSubtree(s.left, t) || isSubtree(s.right, t);
    }

    fun equals(s: TreeNode?, t: TreeNode?): Boolean {
        if (s == null && t == null)
            return true;

        if (s == null || t == null)
            return false;

        if (s.`val` != t.`val`)
            return false;

        return equals(s.left, t.left) && equals(s.right, t.right);
    }
}