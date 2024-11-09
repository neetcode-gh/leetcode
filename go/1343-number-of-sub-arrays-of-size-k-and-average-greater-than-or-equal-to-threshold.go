func numOfSubarrays(arr []int, k int, threshold int) int {
	res := 0

	var sum func([]int) int
	sum = func(nums []int) int {
		r := 0
		for _, n := range nums {
			r += n
		}
		return r
	}

	curSum := sum(arr[:k-1])

	for i := k - 1; i < len(arr); i++ {
		curSum += arr[i]
		if (curSum / k) >= threshold {
			res += 1
		}
		curSum -= arr[i-k+1]
	}

	return res
}
