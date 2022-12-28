package kotlin

import TreeNode

class Solution {

    fun diameterOfBinaryTree(root: TreeNode?): Int = maxDiameter(root).second

    private fun maxDiameter(root: TreeNode?): Pair<Int, Int> {
        if (root == null) return Pair(-1, -1)
        val (heightOfLeftSubTree, maxDiameterOfLeftSubTree) = maxDiameter(root.left)
        val (heightOfRightSubTree, maxDiameterOfRightSubTree) = maxDiameter(root.right)
        val height = 1 + maxOf(heightOfLeftSubTree, heightOfRightSubTree)
        val diameter = 2 + heightOfLeftSubTree + heightOfRightSubTree
        return Pair(
            height,
            maxOf(maxDiameterOfLeftSubTree, maxDiameterOfRightSubTree, diameter)
        )
    }
}