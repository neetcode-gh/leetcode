package kotlin

import TreeNode
import java.util.*

class Solution {
    fun kthSmallest(root: TreeNode, k: Int): Int {
        var n = 0
        val callStack = Stack<TreeNode>()
        var currentNode: TreeNode? = root
        var tempNode: TreeNode?
        while (true) {
            while (currentNode != null) {
                callStack.push(currentNode)
                currentNode = currentNode.left
            }
            tempNode = callStack.pop()
            if (++n == k) return tempNode.`val`
            currentNode = tempNode.right
        }
    }
}