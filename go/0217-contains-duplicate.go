func containsDuplicate(nums []int) bool {
	nums_map := map[int]bool{}
	for _, n := range nums {
		if _, ok := nums_map[n]; ok {
			return true
		} 
		nums_map[n] = true
	}
	return false
}
