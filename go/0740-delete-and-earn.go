func deleteAndEarn(nums []int) int {
	count := make(map[int]int)

	unique := make([]int, 0)

	for _, num := range nums {
		if _, ok := count[num]; !ok {
			unique = append(unique, num)
		}

		count[num]++
	}

	sort.Ints(unique)

	earn1, earn2 := 0, 0

	for i := 0; i < len(unique); i++ {
		currEarn := unique[i] * count[unique[i]]

		if i > 0 && unique[i] == unique[i - 1] + 1 {
			temp := earn2
			earn2 = max(earn2, currEarn + earn1)
			earn1 = temp
		} else {
			temp := earn2
			earn2 = currEarn + earn2
			earn1 = temp
		}
	}

	return earn2
}

func max(a, b int) int {
	if a > b {
		return a
	}

	return b
}