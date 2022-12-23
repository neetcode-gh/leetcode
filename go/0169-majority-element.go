func majorityElement(nums []int) int {
	counter := map[int]int{}
	treshold := len(nums) / 2
	for _, n := range nums {
		counter[n]++
		if counter[n] > treshold {
			return n
		}
	}
	return -1
}
