
class Solution {
    private val parent = ArrayList<Int>()
    private val rank = ArrayList<Int>()

    fun countComponents(n:Int, edges:Array<IntArray>):Int {
        var count = n
        for (i in 0 until n) {
            parent.add(i)
            rank.add(1)
        }

        for (i in edges.indices) {
            count -= union(edges[i][0], edges[i][1])
        }

        return count
    }

    private fun find(node:Int):Int{
        var result = node
        while (parent[result] != result){
            parent[result] = parent[parent[result]]
            result = parent[result]
        }
        return result
    }

    private fun union(node1:Int, node2:Int):Int{
        val root1 = find(node1)
        val root2 = find(node2)
        if (root1==root2)
            return 0
        if (rank[root1] > rank[root2]){
            parent[root2] = root1
            rank[root1] += rank[root2]
        } else {
            parent[root1] = root2
            rank[root2] += rank[root1]
        }
        return 1
    }
}