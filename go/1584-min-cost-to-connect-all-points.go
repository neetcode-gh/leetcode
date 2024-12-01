func minCostConnectPoints(points [][]int) int {

	n := len(points)
	adj := make([][][]int, n)
	for i := 0; i < n; i++ {
		x1, y1 := points[i][0], points[i][1]
		for j := i + 1; j < n; j++ {
			x2, y2 := points[j][0], points[j][1]
			dist := abs(x1-x2) + abs(y1-y2)
			adj[i] = append(adj[i], []int{dist, j})
			adj[j] = append(adj[j], []int{dist, i})
		}
	}
	// prims
	res := 0
	visited := make(map[int]bool)

	h := &IntHeap{[2]int{0, 0}}

	for len(visited) < n {
		pntObj := heap.Pop(h).([2]int)
		cost, pnt := pntObj[0], pntObj[1]

		if visited[pnt] {
			continue
		}
		res += cost
		visited[pnt] = true

		for _, neighbour := range adj[pnt] {
			nCost, nPoint := neighbour[0], neighbour[1]

			if !visited[nPoint] {
				heap.Push(h, [2]int{nCost, nPoint})
			}
		}
	}
	return res
}

func abs(n int) int {
	if n > 0 {
		return n
	}
	return -n
}

type IntHeap [][2]int

func (h IntHeap) Len() int           { return len(h) }
func (h IntHeap) Less(i, j int) bool { return h[i][0] < h[j][0] }
func (h IntHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }

func (h *IntHeap) Push(x interface{}) {
	*h = append(*h, x.([2]int))
}

func (h *IntHeap) Pop() interface{} {
	old := *h
	n := len(old)
	x := old[n-1]
	*h = old[:n-1]
	return x
}