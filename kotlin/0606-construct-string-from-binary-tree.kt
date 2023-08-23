class Solution {
    fun tree2str(root: TreeNode?): String {
        val res = StringBuilder()

        fun preOrder(root: TreeNode?) {
            root?: return

            res.append("(")
            res.append(root.`val`)

            if (root.left == null && root.right != null)
                res.append("()")

            preOrder(root.left)
            preOrder(root.right)
            res.append(")")
        }

        preOrder(root)
        res.deleteCharAt(0)
        res.deleteCharAt(res.lastIndex)
        return res.toString()
    }
}
