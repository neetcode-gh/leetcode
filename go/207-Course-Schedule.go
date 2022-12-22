func canFinish(numCourses int, prerequisites [][]int) bool {
	graph := make(map[int][]int)

	for _, prer := range prerequisites {
		graph[prer[1]] = append(graph[prer[1]], prer[0])
	}

	visitSet := make(map[int]struct{})

	var dfs func(course int) bool

	dfs = func(course int) bool {
		if _, ok := visitSet[course]; ok {
			return false
		}

		if len(graph[course]) == 0 {
			return true
		}

		visitSet[course] = struct{}{}

		for _, pre := range graph[course] {
			if !dfs(pre) {
				return false
			}
		}
		delete(visitSet, course)

		graph[course] = []int{}

		return true
	}

	for i := 0; i < numCourses; i++ {
		if !dfs(i) {
			return false
		}
	}

	return true
}
