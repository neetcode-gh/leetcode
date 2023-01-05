func ladderLength(beginWord string, endWord string, wordList []string) int {
    if !contains(wordList, endWord) {
        return 0
    }
    
    nei := make(map[string][]string)
    wordList = append(wordList, beginWord)
    for _, word := range wordList {
        for j := 0; j < len(word); j++ {
            pattern := word[:j] + "*" + word[j + 1:]
            nei[pattern] = append(nei[pattern], word)
        }
    }
    
    visit := map[string]bool{beginWord: true}
    q := []string{beginWord}
    res := 1
    for len(q) != 0 {
        for tmp := len(q); tmp > 0; tmp-- {
            word := q[0]
            q = q[1:]
            if word == endWord {
                return res
            }
            for j := 0; j < len(word); j++ {
                pattern := word[:j] + "*" + word[j + 1:]
                for _, neiWord := range nei[pattern] {
                    if !visit[neiWord] {
                        visit[neiWord] = true
                        q = append(q, neiWord)
                    }
                }
            }
        }
        res += 1
    }
    return 0
}

func contains(s []string, word string) bool {
    for _, element := range s {
        if element == word {
            return true
        }
    }
    return false
}
