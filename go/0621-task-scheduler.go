type MaxHeap []int

func (h MaxHeap) Len() int            { return len(h) }
func (h MaxHeap) Less(i, j int) bool  { return h[i] < h[j] }
func (h MaxHeap) Swap(i, j int)       { h[i], h[j] = h[j], h[i] }
func (h *MaxHeap) Push(x interface{}) { *h = append(*h, x.(int)) }
func (h *MaxHeap) Pop() interface{} {
	old := *h
	n := len(old)
	x := old[n-1]
	*h = old[0 : n-1]
	return x
}

func leastInterval(tasks []byte, n int) int {
	// each task 1 unit time
	// minimize idle time

	// count the occurance of charater in tasks (list)
	count := make(map[byte]int, 0)
	occuranceOfCharaters(count, tasks)

	maxHeap := &MaxHeap{}
	// adding count values to maxheap
	for _, value := range count {
		*maxHeap = append(*maxHeap, -value)
	}
	// Heapify the maxHeap
	heap.Init(maxHeap)

	var time int = 0
	var deque [][]int

	for maxHeap.Len() != 0 || len(deque) != 0 {
		time += 1
		if maxHeap.Len() != 0 {
			cnt := 1 + heap.Pop(maxHeap).(int)
			if cnt != 0 {
				deque = append(deque, []int{cnt, time + n})
			}
		}

		if len(deque) != 0 && deque[0][1] == time {
			// first push the left most element to deque
			heap.Push(maxHeap, deque[0][0])
			// deque pop left (pop first)
			deque = deque[1:]
		}
	}
	return time
}

func occuranceOfCharaters(count map[byte]int, tasks []byte) {
	for _, val := range tasks {
		if cnt, ok := count[val]; ok {
			count[val] = cnt + 1
			continue
		}
		count[val] = 1
	}
}
