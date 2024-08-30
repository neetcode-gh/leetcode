func minSwaps(s string) int {
	close, maxClose := 0, 0
	for _, c := range s {
		if c == '[' {
			close += -1
		} else {
			close += +1
		}

		if close > maxClose {
			maxClose = close
		}
	}
	return (maxClose + 1) / 2
}