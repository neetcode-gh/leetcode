func longestConsecutive(nums []int) int {
	set := make(map[int]bool)
	longest := 0

	for _, n := range nums {
		set[n] = true
	}

	for _, n := range nums {
		if !set[n - 1] {
			length := 1
			for set[n + length] {
				length++
			}
			longest = max(length, longest)
		}
	}

	return longest
}
