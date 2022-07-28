func canFinish(numCourses int, prerequisites [][]int) bool {
    visited := map[int]bool{}
    adjList, indegree := getMaps(prerequisites)

    
    q := []int{}
    for i := 0; i < numCourses; i++ {
        if indegree[i] == 0 {
            q = append(q, i)
        }
    }
    
    for len(q) > 0 {
        course := q[0] // top
        q = q[1:]
        
        visited[course] = true
        for _, conn := range adjList[course] {
            indegree[conn]--
            
            if indegree[conn] == 0 && !visited[conn] {
                q = append(q, conn)
                delete(indegree, conn)
            }
        }
    }
    
    return len(indegree) == 0
}

func getMaps(edges [][]int) (map[int][]int, map[int]int) {
    adjList := map[int][]int{}
    indegree := map[int]int{}
    
    for _, edge := range edges {
        s, e := edge[1], edge[0]
        adjList[s] = append(adjList[s], e)
        
        indegree[e]++
    }
    return adjList, indegree
}