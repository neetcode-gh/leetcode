func maximumRemovals(s string, p string, removable []int) int {
	l, r := 0, len(removable)-1
	for l <= r {
		m := (l + r) / 2
		remove := make(map[int]bool)
		for i := 0; i <= m; i++ {
			remove[removable[i]] = true
		}
		if isSubsequence(s, p, remove) {
			l = m + 1
		} else {
			r = m - 1
		}
	}
	return r + 1
}

func isSubsequence(s, p string, remove map[int]bool) bool {
	i, j := 0, 0
	for i < len(s) && j < len(p) {
		if remove[i] == true || s[i] != p[j] {
			i++
			continue
		}
		i++
		j++
	}
	return j == len(p)
}   
	 
	 
	 
 