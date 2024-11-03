class Solution {
    fun findSmallestSetOfVertices(n: Int, edges: List<List<Int>>): List<Int> {
        val inDegreeZero = HashSet<Int>().apply {
            for (i in 0 until n) 
                add(i)
        }

        for (edge in edges)
            inDegreeZero.remove(edge[1])
        
        return inDegreeZero.toList()
    }
}

//kotlin idomatic
class Solution {
    fun findSmallestSetOfVertices(n: Int, edges: List<List<Int>>) = (0..n - 1) - edges.map { it[1] }
}
