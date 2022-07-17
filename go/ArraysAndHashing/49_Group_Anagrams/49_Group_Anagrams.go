package groupAnagrams

func groupAnagrams(strs []string) [][]string {
	var result [][]string
	strsMap := make(map[[26]int][]string)
	var charArray [26]int
	var anagramGroup []string
	for i := 0; i < len(strs); i++ {
		for _, char := range strs[i] {
			charIndex := char - 'a'
			charArray[charIndex] += 1
		}
		anagramGroup = strsMap[charArray]
		anagramGroup = append(anagramGroup, strs[i])
		strsMap[charArray] = anagramGroup
		charArray = [26]int{}
	}
	// fmt.Println(strsMap)
	for _, value := range strsMap {
		result = append(result, value)
	}
	return result
}
