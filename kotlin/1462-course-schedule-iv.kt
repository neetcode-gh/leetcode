class Solution {
    fun checkIfPrerequisite(
        numCourses: Int,
        prerequisites: Array<IntArray>,
        queries: Array<IntArray>
    ): List<Boolean> {
        // { course -> [ immediate pre-requisites ] }
        val adjacencyList = mutableMapOf<Int, MutableList<Int>>()
        prerequisites.forEach { (immediatePrerequisite, course) ->
            adjacencyList.getOrPut(course) { mutableListOf() }.add(immediatePrerequisite)
        }
        // { course -> [ complete set of prerequisites including transitive pre-requisites ] }
        val prerequisitesMap = mutableMapOf<Int, HashSet<Int>>()
        fun dfs(startCourse: Int, currentCourse: Int = startCourse) {
            if (currentCourse in (prerequisitesMap[startCourse] ?: hashSetOf())) return
            if (currentCourse != startCourse) {
                prerequisitesMap.getOrPut(startCourse) { hashSetOf() }.add(currentCourse)
            }
            for (immediatePrerequisite in adjacencyList[currentCourse] ?: mutableListOf()) {
                dfs(startCourse, immediatePrerequisite)
            }
        }

        for (course in 0 until numCourses) {
            dfs(startCourse = course)
        }

        val resultantList = mutableListOf<Boolean>()
        queries.forEach { (prerequisite, course) ->
            resultantList.add(prerequisitesMap[course]?.let { prerequisite in it } ?: false)
        }
        return resultantList
    }
}