func longestConsecutive(nums []int) int {
	set := map[int]bool{}

	for _, num := range nums {
		set[num] = true
	}

	res := 0

	for _, num := range nums {
		if set[num-1] {
			continue
		}

		sequence := 1
		temp := num + 1

		for set[temp] {
			sequence++
			temp++
		}

		if sequence > res {
			res = sequence
		}
	}

	return res
}