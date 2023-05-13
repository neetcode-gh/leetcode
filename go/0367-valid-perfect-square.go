func isPerfectSquare(num int) bool {
	l, r := 0, num
	for l <= r {
		m := (l + r) / 2
		product := m * m
		if product == num {
			return true
		} else if product > num {
			r = m - 1
		} else {
			l = m + 1
		}
	}
	return false
}