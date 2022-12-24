func canCompleteCircuit(gas []int, cost []int) int {
	sumGas := 0
	sumCost := 0

	for idx, _ := range gas {
		sumGas += gas[idx]
		sumCost += cost[idx]
	}

	if sumGas < sumCost {
		return -1
	}

	res := 0
	total := 0

	for idx, _ := range gas {
		total += gas[idx] - cost[idx]

		if total < 0 {
			total = 0
			res = idx + 1
		}
	}

	return res
}