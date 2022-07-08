func twoSum(nums []int, target int) []int {
	m := map[int]int{}

	var res []int
	for i, num := range nums {
		if j, ok := m[num]; ok {
			res = []int{i, j}
		}

		m[target-num] = i
	}
	return res
}