func maxSlidingWindow(nums []int, k int) []int {
	if k == 1 {
		return nums
	}
	ans := []int{}
	l := k
	max, idx := maxOfArr(nums[:k])
	ans = append(ans, max)

	for l < len(nums) {
		if l > idx+k-1 {
			if nums[l] >= max {
				max, idx =  nums[l], l
			} else {
				max, idx = maxOfArr(nums[l-k+1 : l+1])
			}
			ans = append(ans, max)
			l++
			continue
		} else {
			if nums[l] > max {
				max, idx = nums[l], l
			}
		}
		ans = append(ans, max)
		l++
	}
	return ans
}

func maxOfArr(arr []int) (int, int) {
	m, j := arr[0], 0
	for i, v := range arr {
		if v > m {
			m = v
			j = i
		}
	}
	return m, j
}
