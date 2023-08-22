func lengthOfLastWord(s string) int {
	l := 0

	for i := len(s) - 1; i >= 0; i-- {
		if s[i] == ' ' {
			if l >= 1 {
				return l
			}
		} else {
			l++
		}
	}

	return l
}å