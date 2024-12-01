func strStr(haystack string, needle string) int {
	if haystack == "" && needle == "" {
		return 0
	}
	lh := len(haystack)
	ln := len(needle)
	for i := 0; i < lh; i++ {
		ct := 0
		for j := 0; j < ln; j++ {
			if i+j >= lh {
				return -1
			}
			if needle[j] != haystack[i+j] {
				break
			}
			ct++
		}
		if ct == ln {
			return i
		}
	}
	return -1
}
