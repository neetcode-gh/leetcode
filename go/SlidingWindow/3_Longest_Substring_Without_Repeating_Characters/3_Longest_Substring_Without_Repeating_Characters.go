package longestsubstringwithoutrepeatingcharacters

func lengthOfLongestSubstring(s string) int {
	if s == "" {
		return 0
	}
	longestSubstring := 1
	charMap := make(map[byte]int)
	leftPointer := 0
	rightPointer := 0

	for rightPointer < len(s) {
		_, ok := charMap[s[rightPointer]]
		if !ok {
			charMap[s[rightPointer]] = 1
			longestSubstring = max(longestSubstring, (rightPointer-leftPointer)+1)
			// char is not present in set increment the window
			rightPointer++

		} else {
			// Adding the character is making the window have duplicates. delete the left pointer data and incremenet by 1
			delete(charMap, s[leftPointer])
			leftPointer++
		}
	}

	return longestSubstring
}

func max(i, j int) int {
	if i > j {
		return i
	}
	return j
}
