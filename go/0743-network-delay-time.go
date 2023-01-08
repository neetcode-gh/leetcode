type neighbour struct {
	destination int
	weight      int
}

type heapNode struct {
	distance  int
	nodeIndex int
}

func networkDelayTime(times [][]int, n int, k int) int {
	edgeMap := make(map[int][]neighbour)
	for _, log := range times {
		edgeMap[log[0]] = append(edgeMap[log[0]], neighbour{destination: log[1], weight: log[2]})
	}

	h := &minHeap{heapNode{distance: 0, nodeIndex: k}}
	heap.Init(h)
	visited := make(map[int]bool)
	t := 0

	for !h.isEmpty() {
		hNode := heap.Pop(h).(heapNode)

		if vis := visited[hNode.nodeIndex]; vis {
			continue
		}

		t = max(t, hNode.distance)

		visited[hNode.nodeIndex] = true

		neighbours := edgeMap[hNode.nodeIndex]
		for _, neigh := range neighbours {
			if vis := visited[neigh.destination]; !vis {
				heap.Push(h, heapNode{
					distance:  neigh.weight + hNode.distance,
					nodeIndex: neigh.destination})
			}
		}
	}

	if n == len(visited) {
		return t
	}
	return -1
}

func max(a, b int) int {
	if a < b {
		return b
	}
	return a
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