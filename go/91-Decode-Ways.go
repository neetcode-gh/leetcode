func numDecodings(s string) int {
	slen := len(s)
	if slen == 0 {
		return 0
	}

	dp := make([]int, slen)
	if canDecode(s, 0, 1) {
		dp[0] = 1
	} else {
		dp[0] = 0
	}

	for i := 1; i < slen; i++ {
		switch {
		case canDecode(s, i, 1) && canDecode(s, i, 2):
			prev := 1
			if i >= 2 {
				prev = dp[i-2]
			}
			dp[i] = dp[i-1] + prev
		case canDecode(s, i, 1) && !canDecode(s, i, 2):
			dp[i] = dp[i-1]
		case !canDecode(s, i, 1) && canDecode(s, i, 2):
			prev := 1
			if i >= 2 {
				prev = dp[i-2]
			}
			dp[i] = prev
		default: // decoding gets stuck here :-/
			return 0
		}
	}
	return dp[slen-1]
}

func canDecode(s string, i int, l int) bool {
	if l == 1 {
		return s[i] > '0' && s[i] <= '9'
	} else if l == 2 {
		return s[i-1:i+1] >= "10" && s[i-1:i+1] <= "26"
	}
	return false
}