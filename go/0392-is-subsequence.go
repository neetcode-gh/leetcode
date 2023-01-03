func isSubsequence(s string, t string) bool {
	if len(s) == 0 {
		return true
	}

	p := 0


	for i := 0; i < len(t); i++ {
		if s[p] == t[i] {
			p++
		}

		if p == len(s) {
			return true
		}
	}

	return false
}