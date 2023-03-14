package main

import (
	"sort"
	"strings"
)

func groupAnagrams(strs []string) [][]string {
	kb := make(map[string][]string)

	for _, str := range strs {
		key := sortString(str)
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

func sortString(str string) string {
	strArr := strings.Split(str, "")
	sort.Strings(strArr)
	return strings.Join(strArr, "")
}
