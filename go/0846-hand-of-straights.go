func isNStraightHand(hand []int, groupSize int) bool {

	if len(hand)%groupSize != 0 {
		return false
	}

	countMap := make(map[int]int)

	for _, num := range hand {
		countMap[num]++
	}

	var minHeap []int

	for uniqueNum, _ := range countMap {
		minHeap = append(minHeap, uniqueNum)
	}

	sort.Ints(minHeap)

	for len(minHeap) != 0 {
		first := minHeap[0]

		for i := first; i < groupSize+first; i++ {
			if _, ok := countMap[i]; !ok {
				return false
			}

			countMap[i]--
			val := countMap[i]

			if val == 0 {
				if i != minHeap[0] {
					return false
				}

				minHeap = minHeap[1:]
			}

		}

	}
	return true

}