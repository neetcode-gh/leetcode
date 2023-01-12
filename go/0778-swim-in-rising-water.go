type position struct {
	r int
	c int
}

func swimInWater(grid [][]int) int {
	n := len(grid)
	h := &minHeap{heapNode{distance: grid[0][0], nodePosition: position{r: 0, c: 0}}}
	heap.Init(h)

	visited := make(map[position]bool)

	addToHeap := func(r, c, maximum int) {
		if r >= 0 && r < n && c >= 0 && c < n && !visited[position{r: r, c: c}] {
			heap.Push(h,
				heapNode{
					distance:     max(maximum, grid[r][c]),
					nodePosition: position{r: r, c: c},
				},
			)
			visited[position{r: r, c: c}] = true
		}
	}

	for h.Len() != 0 {
		hNode := heap.Pop(h).(heapNode)
		rPos, cPos := hNode.nodePosition.r, hNode.nodePosition.c

		if rPos == n-1 && cPos == n-1 {
			return hNode.distance
		}

		addToHeap(rPos-1, cPos, hNode.distance)
		addToHeap(rPos+1, cPos, hNode.distance)
		addToHeap(rPos, cPos-1, hNode.distance)
		addToHeap(rPos, cPos+1, hNode.distance)

	}
	return -1

}

func max(a, b int) int {
	if a < b {
		return b
	}
	return a
}

// min heap

type heapNode struct {
	distance     int
	nodePosition position
}

type minHeap []heapNode

func (h minHeap) Len() int           { return len(h) }
func (h *minHeap) isEmpty() bool     { return len(*h) == 0 }
func (h minHeap) Less(i, j int) bool { return h[i].distance < h[j].distance }
func (h minHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }

func (h *minHeap) Push(x interface{}) {
	*h = append(*h, x.(heapNode))
}

func (h *minHeap) Pop() interface{} {
	l := (*h)[len(*h)-1]
	*h = (*h)[:len(*h)-1]
	return l
}