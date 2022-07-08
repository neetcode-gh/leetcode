func isAnagram(s string, t string) bool {
	if len(s) != len(t) {
		return false
	}
	mS := map[rune]int{}
	mT := map[rune]int{}

	for _, char := range s {
		if _, ok := mS[char]; !ok {
			mS[char] = 1
		} else {
			mS[char]++
		}
	}

	for _, char := range t {
		if _, ok := mT[char]; !ok {
			mT[char] = 1
		} else {
			mT[char]++
		}
	}

	for k := range mS {
		if mS[k] != mT[k] {
			return false
		}
	}

	return true
}