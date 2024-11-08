class Solution {
    fun findBottomLeftValue(root: TreeNode?): Int {
        var cur = root
        with (LinkedList<TreeNode?>()) {
            addLast(root)
            while (isNotEmpty()) {
                cur = removeFirst()
                cur?.right?.let { addLast(it) }
                cur?.left?.let { addLast(it) }
            }
        }
        return cur?.`val` ?: 0
    }
}
