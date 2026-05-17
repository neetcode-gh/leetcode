import (
	"container/heap"
)

type IntHeap []int

func (h IntHeap) Len() int {
	return len(h)
}

func (h IntHeap) Less(i, j int) bool {
	return h[i] < h[j]
}

func (h *IntHeap) Push(x any) {
	*h = append(*h, x.(int))
}

func (h *IntHeap) Pop() any {
	old := *h
	n := len(old)
	el := old[n-1]
	*h = old[0 : n-1]
	return el
}

func (h IntHeap) Swap(i, j int) {
	h[i], h[j] = h[j], h[i]
}

func findKthLargest(nums []int, k int) int {
	intheap := IntHeap([]int{})
	heap.Init(&intheap)
	for _, v := range nums {
		heap.Push(&intheap, v)
		if intheap.Len() > k {
			heap.Pop(&intheap)
		}
	}
	return intheap[0]
}
