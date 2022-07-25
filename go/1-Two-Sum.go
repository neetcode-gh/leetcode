func twoSum(nums []int, target int) []int {
	m := make(map[int]int)
	for idx, num := range nums {

		if val, found := m[target-num]; found {
			return []int{val, idx}
		}

		m[num] = idx
	}
	return nil
}
