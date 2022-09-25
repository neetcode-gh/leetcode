func minWindow(s string, t string) string {
	start, end := 0, 0
	targetCharacterFrequency := make(map[uint8]int)
	currentCharacterFrequency := make(map[uint8]int)
	distinctCharacterCount := 0
	minSubstring := ""

	for index := range t {
		targetCharacterFrequency[t[index]]++
	}

	for end < len(s) {
		currentCharacterFrequency[s[end]]++
		if targetCharacterFrequency[s[end]] != 0 &&
			targetCharacterFrequency[s[end]] == currentCharacterFrequency[s[end]] {
			distinctCharacterCount++
		}

		for distinctCharacterCount == len(targetCharacterFrequency) {
			if minSubstring == "" {
				minSubstring = s[start:end+1]
			}
			if end - start + 1 < len(minSubstring) {
				minSubstring = s[start:end+1]
			}

			currentCharacterFrequency[s[start]]--
			if currentCharacterFrequency[s[start]] < targetCharacterFrequency[s[start]] {
				distinctCharacterCount--
			}

			start++
		}
		end++
	}

	return minSubstring
}

