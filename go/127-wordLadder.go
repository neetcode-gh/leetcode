func ladderLength(beginWord string, endWord string, wordList []string) int {
	m := make(map[string]bool)
	for _, v := range wordList {
		m[v] = true
	}
	list := []string{}
	list = append(list, beginWord)
	rst := 1
	for len(list) != 0 {
		l := len(list)
		for i := 0; i < l; i ++ {
			word := list[0]
			list = list[1:]
			if word == endWord {
				return rst
			}
			m[word] = false
			for i, _ := range word {
				for j := 0; j < 26; j++ {
					tmp := []rune(word)
					tmp[i] = rune('a' + j)
					ts := string(tmp)
					if v, ok := m[ts]; ok && v && ((len(list) != 0 && ts != list[len(list) - 1]) || len(list) == 0) {
						list = append(list, ts)
					}
				}
			}
		}
		rst++
	}
	return 0
}
