package longestrepeatingcharacterreplacement

func characterReplacement(s string, k int) int {
	var result int
	var maxFrequency int
	charMap := make(map[byte]int)
	leftPointer := 0
	rightPointer := 0

	for rightPointer < len(s) {
		lengthOfWindow := rightPointer - leftPointer + 1

		_, ok := charMap[s[rightPointer]]
		if ok {
			charMap[s[rightPointer]]++
		} else {
			charMap[s[rightPointer]] = 1
		}
		maxFrequency = max(maxFrequency, charMap[s[rightPointer]])

		if lengthOfWindow-maxFrequency <= k {
			// we can still add elements to the subarray so move the right pointer forward and
			// update the result with the current max window
			rightPointer++
			result = max(result, lengthOfWindow)
		} else {
			charMap[s[leftPointer]]--
			// since the previous condition failed and we didnt increment the right pointer
			// if we dont do this the right pointer frequency will be incremented again.
			charMap[s[rightPointer]]--
			leftPointer++
		}
	}
	return result
}

func max(i, j int) int {
	if i > j {
		return i
	}
	return j
}
