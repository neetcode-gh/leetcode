func isSubsequence(s string, t string) bool {
	L, R := 0, 0

	for L < len(s) && R < len(t) {
		if t[R] == s[L] {
			L++
		}
		R++
	}
	return L == len(s)
}
