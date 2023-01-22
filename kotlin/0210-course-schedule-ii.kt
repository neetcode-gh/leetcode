class Solution {
    fun findOrder(numCourses: Int, prerequisites: Array<IntArray>): IntArray {
        val edges = Array<ArrayList<Int>>(numCourses) { ArrayList() }
        val visited = BooleanArray(numCourses); val cycle = BooleanArray(numCourses)
        val topologicalOrder = IntArray(numCourses)
        val res = mutableListOf<Int>()
        prerequisites.forEach{
            val (a,b) = it
            edges[a].add(b)
        }      
        for(course in 0..numCourses-1){
            if(dfs(course, visited, cycle, edges, res) == false)
                return intArrayOf()
        }
        return res.toIntArray()
    }
    private fun dfs(course: Int, visited: BooleanArray, cycle: BooleanArray, edges: Array<ArrayList<Int>>, res: MutableList<Int>): Boolean{
        if(cycle[course] == true)
            return false
        if(visited[course] == true)
            return true
        cycle[course] = true
        for(pre in edges[course]){
            if(dfs(pre, visited, cycle, edges, res) == false)
                return false
        }
        cycle[course] = false
        visited[course] = true
        res.add(course)
        return true
    }
}
