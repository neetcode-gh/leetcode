class BSTIterator(root: TreeNode?) {
    val stack = LinkedList<TreeNode>()

    init {
        var cur = root
        while (cur != null) {
            stack.addLast(cur)
            cur = cur?.left
        }
    }

    fun next(): Int {
        var res = stack.removeLast()

        var cur = res?.right
        while (cur != null) {
            stack.addLast(cur)
            cur = cur?.left
        }

        return res.`val`
    }

    fun hasNext() = stack.size > 0

}
