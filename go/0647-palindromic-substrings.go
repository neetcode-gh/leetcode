func countSubstrings(s string) int {
	n := len(s)
	pal := func(l, r int) int {
		count := 0
		for l >= 0 && r < n && s[l] == s[r] {
			count++
			l--
			r++
		}
		return count
	}

	count := 0
	for i := range s {
		count += pal(i, i)
		count += pal(i, i+1)
	}
	return count
}