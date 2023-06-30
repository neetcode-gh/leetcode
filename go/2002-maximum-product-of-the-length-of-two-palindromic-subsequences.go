func maxProduct(s string) (res int) {
	dp := make([]int, 1<<len(s))
	mask := (1 << len(s)) - 1
	palindromeSize := func(s string, mask int) (res int) {
		i, j := 0, len(s)
		for i <= j {
			if mask&(1<<i) == 0 {
				i++
			} else if mask&(1<<j) == 0 {
				j--
			} else if s[i] != s[j] {
				return 0
			} else {
				if i == j {
					res++
				} else {
					res += 2
				}
				i++
				j--
			}
		}
		return res
	}

	max := func(a, b int) int {
		if a > b {
			return a
		}
		return b
	}

	for m := 1; m <= mask; m++ {
		dp[m] = palindromeSize(s, m)
	}

	for m1 := mask; m1 > 0; m1-- {
		if dp[m1]*(len(s)-dp[m1]) <= res {
			continue
		}
		for m2 := mask ^ m1; m2 > 0; m2 = (m2 - 1) & (mask ^ m1) {
			res = max(res, dp[m1]*dp[m2])
		}
	}
	return
}