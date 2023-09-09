func containsDuplicate(nums []int) bool {
	if len(nums) <= 1 {
		return false
	}

	xm := make(map[int]struct{})

	for _, v := range nums {
		if _, ok := xm[v]; ok {
			return true
		}

		xm[v] = struct{}{}
	}

	return false
}
