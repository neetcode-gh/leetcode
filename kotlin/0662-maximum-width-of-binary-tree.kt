/**
 * Example:
 * var ti = TreeNode(5)
 * var v = ti.`val`
 * Definition for a binary tree node.
 * class TreeNode(var `val`: Int) {
 *     var left: TreeNode? = null
 *     var right: TreeNode? = null
 * }
 */

/*
* BFS solution
*/
class Solution {
    fun widthOfBinaryTree(root: TreeNode?): Int {
        root?: return 0

        val q = ArrayDeque<Triple<TreeNode?, Int, Int>>()
        
        var res = 0
        var prevLevel = 0
        var prevNum = 1
        q.add(Triple(root, 1, 0))

        while (q.isNotEmpty()) {
            val (node, num, level) = q.poll()

            if (level > prevLevel) {
                prevLevel = level
                prevNum = num
            }

            res = maxOf(res, num - prevNum + 1)

            node?.left?.let {
                q.add(Triple(node.left, 2 * num, level + 1)) 
            }
            node?.right?.let {
                q.add(Triple(node.right, 2 * num + 1, level + 1)) 
            }
        }

        return res
    }   
}

/*
* DFS solution
*/
class Solution {
    fun widthOfBinaryTree(root: TreeNode?): Int {
        var width = 0
        val levelMap = HashMap<Int, Int>()
        
        fun dfs(node: TreeNode?, depth: Int, pos: Int, levelMap: HashMap<Int, Int>) {
            node?: return
            if(!levelMap.contains(depth))
                levelMap[depth] = pos
            width = maxOf(width, (pos - levelMap[depth]!! + 1))
            dfs(node.left, depth+1, 2*pos, levelMap)
            dfs(node.right, depth+1, 2*pos+1, levelMap)
        }
              
        dfs(root, 0, 0, levelMap)
        return width
    }
    
}
