func findOrder(numCourses int, prerequisites [][]int) []int {
	graph, incomings := buildMap(numCourses, prerequisites)

	var starts []int
	for i, incoming := range incomings {
		if incoming == 0 {
			starts = append(starts, i)
		}
	}

	var res []int
	var visitNum int
	for _, start := range starts {
		queue := []int{start}
		res = append(res, start)
		visitNum += 1
		for len(queue) > 0 {
			node := queue[0]
			queue = queue[1:]
			neighbors, ok := graph[node]
			if ok {
				for _, neighbor := range neighbors {
					incomings[neighbor] -= 1
					if incomings[neighbor] == 0 {
						queue = append(queue, neighbor)
						res = append(res, neighbor)
						visitNum += 1
					}
				}
			}
		}
	}
	if visitNum == numCourses {
		return res
	}
	return []int{}
}

func buildMap(numCourses int, prerequisites [][]int) (map[int][]int, []int) {
	graph := make(map[int][]int)
	incomings := make([]int, numCourses)
	for _, preq := range prerequisites {
		if _, ok := graph[preq[1]]; !ok {
			graph[preq[1]] = []int{preq[0]}
		} else {
			graph[preq[1]] = append(graph[preq[1]], preq[0])
		}
		incomings[preq[0]] += 1
	}
	return graph, incomings
}