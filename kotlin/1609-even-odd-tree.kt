class Solution {
    fun isEvenOddTree(root: TreeNode?): Boolean {
        val q = LinkedList<TreeNode?> ().apply { addLast(root) }
        var even = true

        while (q.isNotEmpty()) {
            var prev = if (isEven) Integer.MIN_VALUE else Integer.MAX_VALUE

            repeat (q.size) {
                val node = q.removeFirst()!!

                if (even && (node.`val` % 2 == 0 || node.`val` <= prev))
                    return false
                else if (!even && (node.`val` % 2 == 1 || node.`val` >= prev))
                    return false

                prev = node.`val`

                node.left?.let { q.addLast(it) }
                node.right?.let { q.addLast(it) }
            }

            even = !even
        }

        return true
    }
}
