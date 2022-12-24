func carFleet(target int, position []int, speed []int) int {
	pair := []carInfo{}
	stack := []float32{}
	for i, _ := range position {
		pair = append(pair, carInfo{position[i], speed[i]})
	}

	sort.Slice(pair, func(i, j int) bool {
		return pair[i].pos < pair[j].pos
	})

	for i := len(pair) - 1; i >= 0; i-- {
		stack = append(stack, float32(target-pair[i].pos)/float32(pair[i].spd))
		if len(stack) >= 2 && stack[len(stack)-1] <= stack[len(stack)-2] {
			stack = stack[:len(stack)-1]
		}
	}
	return len(stack)
}

type carInfo struct {
	pos int
	spd int
}