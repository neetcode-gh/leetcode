func minFlipsMonoIncr(s string) int {
	res, countOne := 0, 0

	for _, ch := range s {
		if ch == '1' {
			countOne++
		} else {
			res = min(res+1, countOne)
		}
	}

	return res
}

func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}