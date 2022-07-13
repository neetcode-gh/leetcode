package permutationinstring

import "fmt"

func checkInclusion(s1 string, s2 string) bool {
	var charMap1, charMap2 [26]int
	if len(s1) > len(s2) {
		return false
	}

	for i := range s1 {
		charMap1[s1[i]-'a']++
		charMap2[s2[i]-'a']++
	}

	matchesCount := getMatchCount(charMap1, charMap2)
	fmt.Println(matchesCount)

	if matchesCount == 26 {
		return true
	}

	leftPointer := 1
	rightPointer := len(s1)
	for rightPointer < len(s2) {
		if matchesCount == 26 {
			return true
		}
		// moving the left pointer right means that we are removing one element.
		// Check if this is causing the matches to be disturbed
		// there are 2 cases arising here.
		// Is already matched record becoming unmatched. By increasing count by 1 we are unmatching it
		// Is unmatching count becoming matched by adding 1

		charMap2[s2[leftPointer-1]-'a']-- // decrease the count by removing the element
		val1 := charMap1[s2[leftPointer-1]-'a']
		val2 := charMap2[s2[leftPointer-1]-'a']
		if val1 == val2 {
			matchesCount++ // unmatched count became matched
		} else if val1 == val2+1 {
			matchesCount--
			// matched count is becoming unmatched. How do we check if it became unmatched ?
			// Add 1 to the charMap2 value because we subtracted it earlier and check if it was matching. If yes
			// that means that it was previously matched and became unmatched
		}

		charMap2[s2[rightPointer]-'a']++
		val1 = charMap1[s2[rightPointer]-'a']
		val2 = charMap2[s2[rightPointer]-'a']
		if val1 == val2 {
			matchesCount++
		} else if val1+1 == val2 {
			matchesCount--
		}
		leftPointer++
		rightPointer++
	}
	return matchesCount == 26
}

func getMatchCount(charMap1 [26]int, charMap2 [26]int) int {
	var matchCount int
	for charMap1Key, charMap1Val := range charMap1 {
		charMap2Val := charMap2[charMap1Key]
		if charMap2Val == charMap1Val {
			matchCount++
		}
	}
	return matchCount
}
