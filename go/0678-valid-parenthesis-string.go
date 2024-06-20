func checkValidString(s string) bool {
	minLeft, maxLeft := 0, 0

	for i := range s {
		if s[i] == '(' {
			minLeft++
			maxLeft++
		} else if s[i] == ')' {
			minLeft--
			maxLeft--
		} else {
			minLeft--
			maxLeft++
		}
		if maxLeft < 0 {
			return false
		}
		if minLeft < 0 {
			minLeft = 0
		}
	}
	return minLeft == 0
}
