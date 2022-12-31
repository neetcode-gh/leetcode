func reverse(x int) int {
	negative := x < 0
	num := 0

	if negative {
		x = -x
	}

	for x > 0 {
		if math.MaxInt32/10 < num {
			return 0
		}

		num = 10*num + x%10
		x /= 10
	}

	if negative {
		return -num
	}

	return num
}