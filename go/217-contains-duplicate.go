func containsDuplicate(nums []int) bool {
	m := map[int]bool{}
	for _, num := range nums {
		if m[num] == true {
			return true
		}
		m[num] = true
	}
	return false
}