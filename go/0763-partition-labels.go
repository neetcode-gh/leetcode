func partitionLabels(s string) []int {
	mapCharToIndex := map[byte]int{}

	for idx := 0; idx < len(s); idx++ {
		mapCharToIndex[s[idx]] = idx
	}

	st, lastIdx := 0, 0
	res := []int{}

	for end := 0; end < len(s); end++ {
		curr := s[end]
		idx := mapCharToIndex[curr]

		if idx > lastIdx {
			lastIdx = idx
		}

		if end == lastIdx {
			res = append(res, lastIdx-st+1)
			st = lastIdx + 1
		}
	}

	return res
}