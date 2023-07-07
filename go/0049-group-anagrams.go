package main

func groupAnagrams(strs []string) [][]string {
	kb := make(map[[26]byte][]string)

	for _, str := range strs {
		key := countLetters(str)
		if _, ok := kb[key]; !ok {
			kb[key] = []string{}
		}
		kb[key] = append(kb[key], str)
	}

	res := make([][]string, len(kb))
	i := 0
	for _, anagrams := range kb {
		res[i] = anagrams
		i++
	}

	return res
}

func countLetters(str string) [26]byte {
	letterCount := [26]byte{}
	for _, letter := range str {
		letterCount[letter-'a']++
	}
	return letterCount
}
