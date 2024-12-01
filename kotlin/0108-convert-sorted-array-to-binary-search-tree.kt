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
    fun sortedArrayToBST(nums: IntArray): TreeNode? {
        
        fun createTree(left: Int, right: Int): TreeNode? {

            if(left > right) return null
            else if(left == right) return TreeNode(nums[left])

            val mid = (left + right) / 2
            val node = TreeNode(nums[mid])
            node.left = createTree(left, mid-1)
            node.right = createTree(mid+1, right)

            return node
        }

        return createTree(0, nums.lastIndex)
    }
}
