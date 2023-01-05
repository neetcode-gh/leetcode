const CRS = 0
const PRE = 1
func findOrder(numCourses int, prerequisites [][]int) []int {
    prereq := make([][]int, 0)
    for i := 0; i < numCourses; i++ {
        prereq = append(prereq, make([]int, 0))
    }
    for _, edge := range prerequisites {
        prereq[edge[CRS]] = append(prereq[edge[CRS]], edge[PRE])
    }
    
    output := make([]int, 0)
    visit, cycle := make([]bool, numCourses), make([]bool, numCourses)
    
    var dfs func(int) bool
    dfs = func(crs int) bool {
        if cycle[crs] {
            return false
        } else if visit[crs] {
            return true
        }
        
        cycle[crs] = true
        for _, pre := range prereq[crs] {
            if !dfs(pre) {
                return false
            }
        }
        cycle[crs] = false
        visit[crs] = true
        output = append(output, crs)
        return true
    }
    
    for c := 0; c < numCourses; c++ {
        if dfs(c) == false {
            return []int{}
        }
    }
    return output
}
