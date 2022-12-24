func countComponents(n int, edges [][]int) int {
	if n == 1 {
		return 1
	}

	var components int

	visited := make([]bool, n)

	graph := make(map[int][]int)

	for _, edge := range edges {
		graph[edge[0]] = append(graph[edge[0]], edge[1])
		graph[edge[1]] = append(graph[edge[1]], edge[0])
	}

	var dfs func(i int)

	dfs = func(i int) {
		visited[i] = true

		for _, j := range graph[i] {
			if !visited[j] {
				dfs(j)
			}
		}
	}

	for i := 0; i < n; i++ {
		if !visited[i] {
			components++
			dfs(i)
		}
	}

	return components
}
