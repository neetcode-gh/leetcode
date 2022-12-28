func findRedundantConnection(edges [][]int) []int {
	parent := make([]int, len(edges)+1)

	for i := 0; i < len(parent); i++ {
		parent[i] = i
	}

	for _, edge := range edges {
		if find(parent, edge[0]) == find(parent, edge[1]) {
			return edge
		}

		unify(parent, edge[0], edge[1])
	}

	return []int{}
}

func find(parent []int, num int) int {
	if parent[num] == num {
		return num
	}

	return find(parent, parent[num])
}

func unify(parent []int, x, y int) {
	parent[find(parent, y)] = find(parent, x)
}

