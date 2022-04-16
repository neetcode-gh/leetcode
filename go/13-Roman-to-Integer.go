package leetcode

func romanToInt(s string) int {

	romans := map[string]int{
		"I": 1,
		"V": 5,
		"X": 10,
		"L": 50,
		"C": 100,
		"D": 500,
		"M": 1000,
	}

	sum := 0

	for i := len(s) - 1; i > 0; i-- {
		// IV : 4
		if romans[string(s[i])] == romans["V"] {
			if romans[string(s[i-1])] == romans["I"] {
				sum -= 1 * 2
			}
		}
		// IX : 4
		if romans[string(s[i])] == romans["X"] {
			if romans[string(s[i-1])] == romans["I"] {
				sum -= 1 * 2
			}
		}
		// XL : 40
		if romans[string(s[i])] == romans["L"] {
			if romans[string(s[i-1])] == romans["X"] {
				sum -= 10 * 2
			}
		}
		// XC : 90
		if romans[string(s[i])] == romans["C"] {
			if romans[string(s[i-1])] == romans["X"] {
				sum -= 10 * 2
			}
		}
		// CD : 400
		if romans[string(s[i])] == romans["D"] {
			if romans[string(s[i-1])] == romans["C"] {
				sum -= 100 * 2
			}
		}
		// CM : 900
		if romans[string(s[i])] == romans["M"] {
			if romans[string(s[i-1])] == romans["C"] {
				sum -= 100 * 2
			}
		}

		sum += romans[string(s[i])]
	}

	sum += romans[string(s[0])]

	return sum
}
