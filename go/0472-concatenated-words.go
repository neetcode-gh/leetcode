func findAllConcatenatedWordsInADict(words []string) []string {
	wordSet := initWordSet(words)
	res := []string{}

	var dfs func(word string) bool

	dfs = func(word string) bool {
		for i := 1; i < len(word); i++ {
			prefix, suffix := word[:i], word[i:]
			if (wordSet[prefix] && wordSet[suffix]) || wordSet[prefix] && dfs(suffix) {
				return true
			}
		}

		return false
	}

	for _, w := range words {
		if dfs(w) {
			res = append(res, w)
		}
	}

	return res
}

func initWordSet(words []string) map[string]bool {
	wordSet := make(map[string]bool, len(words))

	for _, word := range words {
		wordSet[word] = true
	}

	return wordSet
}