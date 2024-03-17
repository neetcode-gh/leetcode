class Solution {
    fun rangeSumBST(root: TreeNode?, low: Int, high: Int): Int {
        root?: return 0

        return if (root.`val` > high) rangeSumBST(root.left, low, high)
        else if (root.`val` < low) rangeSumBST(root.right, low, high)
        else root.`val` + 
            rangeSumBST(root.left, low, high) + 
            rangeSumBST(root.right, low, high)
    }
}
