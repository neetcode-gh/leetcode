type PointEntry struct {
    dist int
    x int
    y int
}

type PointHeap []*PointEntry

func (h PointHeap) Len() int           { return len(h) }
func (h PointHeap) Less(i, j int) bool { return h[i].dist < h[j].dist }
func (h PointHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
func (h *PointHeap) Push(x interface{}) {*h = append(*h, x.(*PointEntry))}
func (h *PointHeap) Pop() interface{} {
	old := *h
	n := len(old)
	x := old[n-1]
	*h = old[0 : n-1]
	return x
}

const X = 0
const Y = 1
func kClosest(points [][]int, k int) [][]int {
    _pts := make([]*PointEntry, 0, len(points))
    for _, point := range points {
        dist := (pow(abs(point[X] - 0), 2) + pow(abs(point[Y] - 0), 2))
        _pts = append(_pts, &PointEntry{dist: dist, x: point[X], y: point[Y]})
    }
    pts := PointHeap(_pts)
    
    res := make([][]int, 0)
    heap.Init(&pts)
    for i := 0; i < k; i++ {
        pointEntry := heap.Pop(&pts).(*PointEntry)
        res = append(res, []int{pointEntry.x, pointEntry.y})
    }
    return res
}

func abs(a int) int {
    if a < 0 {
        return -a
    }
    return a
}

func pow(x, n int) int {
    if n == 0 {
        return 1
    } else if n == 1 {
        return x
    } else {
        return pow(x, n/2) * pow(x, (n + 1)/2)
    }
}
