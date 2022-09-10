/**
 * Definition for a binary tree node.
 * class TreeNode(_value: Int = 0, _left: TreeNode = null, _right: TreeNode = null) {
 *   var value: Int = _value
 *   var left: TreeNode = _left
 *   var right: TreeNode = _right
 * }
 */
object Solution {
    def isSubtree(root: TreeNode, subRoot: TreeNode): Boolean = {
        if (root == null && subRoot == null) {
            return true
        } else if (root != null && subRoot == null) {
            return true
        } else if (root == null && subRoot != null) {
            return false
        } else {
            return isSameTree(root, subRoot) || (isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot))
        }
    }
    
    def isSameTree(p: TreeNode, q: TreeNode): Boolean = {
        if (p == null && q == null) {
            return true
        } else if (p == null || q == null) {
            return false
        } else if (p.value != q.value) {
            return false 
        } else {
            return isSameTree(p.left, q.left) && isSameTree(p.right, q.right)
        }
    }
}