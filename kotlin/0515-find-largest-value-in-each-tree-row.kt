// bfs
class Solution {
    fun largestValues(root: TreeNode?): List<Int> {
        val res = mutableListOf<Int>()
        root?: return res
        
        with (LinkedList<TreeNode?>()) {
            addLast(root)

            while (isNotEmpty()) {
                var levelMax = peekLast()!!.`val`

                repeat (size) {
                    val cur = removeFirst()
                    levelMax = maxOf(levelMax, cur!!.`val`)
                    cur?.left?.let { addLast(it) }
                    cur?.right?.let { addLast(it) }
                }

                res.add(levelMax)
            }
        }

        return res
    }
}

// dfs
class Solution {
    fun largestValues(root: TreeNode?): List<Int> {
        root?: return listOf<Int>()
        
        val maxes = HashMap<Int, Int>()

        fun dfs(cur: TreeNode?, level: Int) {
            cur?: return

            maxes[level] = maxOf(
                cur?.value ?: Integer.MIN_VALUE, 
                maxes.getOrDefault(level, Integer.MIN_VALUE)
            )

            dfs(cur?.left, level + 1)
            dfs(cur?.right, level + 1)
        }

        dfs(root, 0)
        return maxes.values.toList()
    }

    val TreeNode.value
        get()= this.`val`
}
