package minimumwindowsubstring

// When needCounter == haveCounter , it means that the substring we have calculated till this position is
// having all the values of t string
// next step is we will move the left pointer such the we break the condition of substring having all the values.
// once we break the condition we find the new substring to have all the values by moving the right pointer.
// repeat the process. The point where we are breaking the condition of having needCounter == haveCounter , we track the
// lengths and get the minimum value

func minWindow(s string, t string) string {
	var charMap1, charMap2 [60]int
	var needCounter, haveCounter int
	var beginPoint, endPoint, lengthOfString int
	lengthOfString = 2147483647
	if len(s) < len(t) {
		return ""
	}

	charMap1, needCounter = getNeedCounter(t)

	leftPointer := 0
	rightPointer := 0
	for rightPointer < len(s) {
		// add the character to the map and if the count of characters equal to the map we created for `t`
		// increment the have counter
		charMap2[s[rightPointer]-'A']++
		if charMap1[s[rightPointer]-'A'] == charMap2[s[rightPointer]-'A'] {
			haveCounter++
		}

		// get the new string where the have counter and need counter mismatched
		for needCounter == haveCounter {
			if charMap2[s[leftPointer]-'A'] > 0 {
				charMap2[s[leftPointer]-'A']--

			}

			// haveCounter needs to be decremented only when the number of characters for the `s` string
			// is less than the characters of `t` string. This means that the substring in `s` cannot form `t`
			// string using the current set of characters
			if charMap2[s[leftPointer]-'A'] < charMap1[s[leftPointer]-'A'] {
				haveCounter--

				// getting the (length, positions of left and right pointer) at the nearest place
				// where moving the left pointer will make the substring not have all the values from the `t` string.
				// update only when new length of string is less than the previous obtained length since we need minimum substring

				if (rightPointer - leftPointer + 1) < lengthOfString {
					beginPoint = leftPointer
					endPoint = rightPointer
					lengthOfString = rightPointer - leftPointer + 1
				}
			}
			leftPointer++
		}
		rightPointer++
	}
	if lengthOfString <= len(s) {
		return s[beginPoint : endPoint+1]
	}
	return ""
}

func getNeedCounter(t string) ([60]int, int) {
	var charMap1 [60]int
	var needCounter int
	for i := range t {
		charMap1[t[i]-'A']++
	}
	for i := range charMap1 {
		if charMap1[i] > 0 {
			needCounter++
		}
	}

	return charMap1, needCounter
}
