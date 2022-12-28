class TreeNode(var `val`: Int = 0) {
    var left: TreeNode? = null
    var right: TreeNode? = null
}

class Solution {
    fun lowestCommonAncestor(root: TreeNode, p: TreeNode?, q: TreeNode?): TreeNode? {
        var currentRoot: TreeNode? = root
        var lowestCommonAncestor: TreeNode? = null
        while (currentRoot != null) {
            if (currentRoot.`val` > p!!.`val` && currentRoot.`val` > q!!.`val`) {
                currentRoot = currentRoot.left
            } else if (currentRoot.`val` < p.`val` && currentRoot.`val` < q!!.`val`) {
                currentRoot = currentRoot.right
            } else {
                lowestCommonAncestor = currentRoot
                break
            }
        }
        return lowestCommonAncestor
    }
}