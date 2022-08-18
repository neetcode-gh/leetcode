class Solution {
    fun canFinish(numCourses: Int, prerequisites: Array<IntArray>): Boolean {
      
      if (prerequisites.isEmpty()) return true
      
      val nodes = mutableMapOf<Int, MutableList<Int>>()
      prerequisites.forEach { 
        val (v, w) = it
        nodes.getOrPut(v) { mutableListOf<Int>() } += w  
      }
      
      val visited = mutableSetOf<Int>()
      val visitedInCurrentStack = mutableSetOf<Int>()
      var hasCycle = false
      
      fun traverse(startNode: Int) {
        
        visited.add(startNode)
        visitedInCurrentStack.add(startNode)
        
        for (v in nodes[startNode].orEmpty()) {
          if (!visited.contains(v)) {
            traverse(v)
          } else if (visitedInCurrentStack.contains(v)) {
            hasCycle = true
            return
          }
        }
        
        visitedInCurrentStack.remove(startNode)
      }
      
      for (key in nodes.keys) {
        traverse(key)  
      }
      
      return !hasCycle
    }
}