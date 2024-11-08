func maxVowels(s string, k int) int {
	vowel := map[byte]bool{
		'a': true,
		'e': true,
		'i': true,
		'o': true,
		'u': true,
	}

	l, cnt, res := 0, 0, 0
	for r := range len(s) {
		if vowel[s[r]] {
			cnt += 1
		}

		if r-l+1 > k {
			if vowel[s[l]] {
				cnt -= 1
			}
			l += 1
		}
		res = max(res, cnt)
	}
	return res
}
