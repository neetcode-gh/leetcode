func subarraySum(nums []int, k int) int {
	prefix := map[int]int{0: 1}
	curSum := 0
	count := 0
	for _, n := range nums {
		curSum += n
		if _, ok := prefix[curSum-k]; ok {
			count += prefix[curSum-k]
		}
		prefix[curSum]++
	}
	return count
}
