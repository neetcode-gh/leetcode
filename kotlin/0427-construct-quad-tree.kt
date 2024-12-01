/**
 * Definition for a QuadTree node.
 * class Node(var `val`: Boolean, var isLeaf: Boolean) {
 *     var topLeft: Node? = null
 *     var topRight: Node? = null
 *     var bottomLeft: Node? = null
 *     var bottomRight: Node? = null
 * }
 */

class Solution {
    fun construct(grid: Array<IntArray>): Node? {

        fun dfs(n: Int, r: Int, c: Int): Node? {
            var allSame = true

            for(i in 0 until n) {
                for(j in 0 until n) {
                    if(grid[r][c] != grid[r + i][c + j]) {
                        allSame = false
                        break
                    }
                }
            }

            if(allSame) return Node(if(grid[r][c] == 1) true else false, true)

            val nextN = n/2
            val topLeft = dfs(nextN, r, c)
            val topRight = dfs(nextN, r, c + nextN)
            val bottomLeft = dfs(nextN, r + nextN, c)
            val bottomRight = dfs(nextN, r + nextN, c + nextN)

            val node = Node(false, false)
            node.topLeft = topLeft
            node.topRight = topRight
            node.bottomLeft = bottomLeft
            node.bottomRight = bottomRight
            return node
        }

        return dfs(grid.size, 0, 0)
    }
}
