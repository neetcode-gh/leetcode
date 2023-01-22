type IntHeap []int
func (h IntHeap) Len() int           { return len(h) }
func (h IntHeap) Less(i, j int) bool { return h[i] < h[j] }
func (h IntHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
func (h *IntHeap) Push(x interface{}) {*h = append(*h, x.(int))}
func (h *IntHeap) Pop() interface{} {
	old := *h
	n := len(old)
	x := old[n-1]
	*h = old[0 : n-1]
	return x
}

type MedianFinder struct {
    small IntHeap
    large IntHeap
}


func Constructor() MedianFinder {
    return MedianFinder{small: IntHeap{}, large: IntHeap{}}
}


func (this *MedianFinder) AddNum(num int)  {
    if len(this.large) > 0 && num > this.large[0] {
        heap.Push(&this.large, num)
    } else {
        heap.Push(&this.small, -1 * num)
    }
    
    if len(this.small) > len(this.large) + 1 {
        val := -1 * heap.Pop(&this.small).(int)
        heap.Push(&this.large, val)
    }
    if len(this.large) > len(this.small) + 1 {
        val := heap.Pop(&this.large).(int)
        heap.Push(&this.small, -1 * val)
    }
}


func (this *MedianFinder) FindMedian() float64 {
    if len(this.small) > len(this.large) {
        return float64(-1 * this.small[0])
    } else if len(this.large) > len(this.small) {
        return float64(this.large[0])
    }
    return float64(-1 * this.small[0] + this.large[0]) / 2
}
