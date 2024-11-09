// recursion
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

// iterative
class Solution {
    fun tree2str(root: TreeNode?): String {
        root?: return ""

        val res = StringBuilder()
        val stack = LinkedList<TreeNode?>().apply { addLast(root) }
        val visited = HashSet<TreeNode?>()

        while (stack.isNotEmpty()) {
            val cur = stack.peekLast()

            if (cur in visited) {
                stack.removeLast()
                res.append(")")
            } else {
                visited.add(cur)
                res.append("(")
                res.append(cur?.`val`)

                if (cur?.left == null && cur?.right != null)
                    res.append("()")
                
                if (cur?.right != null)
                    stack.addLast(cur?.right)
                if (cur?.left != null)
                    stack.addLast(cur?.left)
            }
        }

        res.deleteCharAt(0)
        res.deleteCharAt(res.lastIndex)
        return res.toString()
    }
}
