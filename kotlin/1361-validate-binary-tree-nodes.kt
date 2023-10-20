class Solution {
    fun validateBinaryTreeNodes(n: Int, leftChild: IntArray, rightChild: IntArray): Boolean {
        val hasParent = hashSetOf<Int>().apply {
            for (n in (leftChild + rightChild)) {
                if (n != -1)
                    this.add(n)
            }
        }

        if (hasParent.size == n) return false

        var root = -1
        for (i in 0 until n) {
            if (i !in hasParent) {
                root = i
                break
            }
        }

        val visit = hashSetOf<Int>()
        fun dfs(i: Int): Boolean {
            if (i == -1) return true
            if (i in visit) return false  

            visit.add(i)

            return dfs(leftChild[i]) && dfs(rightChild[i])
        }

        return dfs(root) && visit.size == n
    }
}
