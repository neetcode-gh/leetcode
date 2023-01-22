func nextGreaterElement(nums1 []int, nums2 []int) []int {
	nums1idx := make(map[int]int)
	ans := []int{}
	for i, v := range nums1 {
		nums1idx[v] = i
		ans = append(ans, -1)
	}
	stack := []int{}

	for _, v := range nums2 {
		for len(stack) > 0 && stack[len(stack)-1] < v {
			val := stack[len(stack)-1]
			stack = stack[:len(stack)-1]
			idx := nums1idx[val]
			ans[idx] = v
		}

		if _, e := nums1idx[v]; !e {
			continue
		}
		stack = append(stack, v)
	}
	return ans
}
