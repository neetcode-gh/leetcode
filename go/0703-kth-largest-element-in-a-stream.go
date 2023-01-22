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

type KthLargest struct {
    minHeap *IntHeap
    k int
}


func Constructor(k int, nums []int) KthLargest {
    tmp := IntHeap(nums)
    this := KthLargest{minHeap: &tmp, k: k}
    heap.Init(this.minHeap)
    for len(*this.minHeap) > k {
        heap.Pop(this.minHeap)
    }
    return this
}


func (this *KthLargest) Add(val int) int {
    heap.Push(this.minHeap, val)
    if len(*this.minHeap) > this.k {
        heap.Pop(this.minHeap)
    }
    return (*this.minHeap)[0]
}
