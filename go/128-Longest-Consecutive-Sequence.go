func longestConsecutive(nums []int) int {
	hm := map[int]bool{}

	for _, num := range nums {
		hm[num] = true
	}

	res := 0
	for num := range hm {
		if _, ok := hm[num-1]; ok {
			continue
		}

		temp := 1
		i := num
		for {
			if _, ok := hm[i+1]; ok {
				temp++
				i++
			} else {
				break
			}
		}

		if temp > res {
			res = temp
		}

	}
	return res
}