package isAnagram

func isAnagram(s string, t string) bool {
	characters := make(map[byte]int)

	if len(s) != len(t) {
		return false
	}

	for i := 0; i < len(s); i++ {
		_, ok := characters[s[i]]
		if !ok {
			characters[s[i]] = 1
		} else {
			characters[s[i]] += 1
		}

	}

	for i := 0; i < len(t); i++ {
		val, ok := characters[t[i]]
		if ok && val > 0 {
			characters[t[i]] -= 1
		} else {
			return false
		}
	}

	return true

}
