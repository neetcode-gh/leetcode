package generateparentheses

func generateParenthesis(n int) []string {
	var result []string
	backTrack(0, 0, n, &result, "")
	return result
}

func backTrack(open int, closed int, n int, result *[]string, cur string) {
	if (open == closed) && (closed == n) && (open == n) {
		*result = append(*result, cur)
		return
	}
	if closed > open {
		return
	}

	if open < n {
		backTrack(open+1, closed, n, result, cur+"(")
	}
	if closed < n {
		backTrack(open, closed+1, n, result, cur+")")
	}
}
