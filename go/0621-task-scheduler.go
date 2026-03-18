func leastInterval(tasks []byte, n int) int {
    count := map[byte]int{}
    for _, task := range tasks {
        count[task]++
    }

    h := &IntHeap{}
    heap.Init(h)
    for _, c := range count {
        heap.Push(h, c)
    }

    cycles := 0
    for h.Len() > 0 {
        temp := []int{}
        for i := 0; i <= n; i++ {
            if h.Len() > 0 {
                temp = append(temp, heap.Pop(h).(int))
            }
        }
        for _, t := range temp {
            if t-1 > 0 {
                heap.Push(h, t-1)
            }
        }
        if h.Len() == 0 {
            cycles += len(temp)
        } else {
            cycles += n + 1
        }
    }

    return cycles
}

type IntHeap []int

func(h IntHeap)Len() int { return len(h)}
func(h IntHeap)Less(i, j int) bool { return h[i] > h[j]}
func(h IntHeap)Swap(i, j int) { h[i], h[j] = h[j], h[i]}
func(h *IntHeap)Push(x interface{}) { 
    *h = append(*h, x.(int))
}
func(h *IntHeap)Pop() interface{} { 
    old := *h
    n := len(old)
    *h = old[:n-1]
    x := old[n-1]
    return x
}
