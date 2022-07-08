func topKFrequent(nums []int, k int) []int {

	freq := make(map[int]int)
	for _, num := range nums {
		freq[num]++
	}

	buckets := make([][]int, 0)
	for i := 0; i < len(nums)+1; i++ {
		buckets = append(buckets, make([]int, 0))
	}

	for num, freq := range freq {
		buckets[freq] = append(buckets[freq], num)
	}

	res := make([]int, 0)

	for i := len(buckets) - 1; i >= 0; i-- {
		for _, num := range buckets[i] {
			res = append(res, num)
			if len(res) == k {
				return res
			}
		}
	}
	return res
}