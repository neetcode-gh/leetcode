package main

import (
	"fmt"
	"sort"
	"strings"
)

func main() {
	var s, t string

	s = "anagramt"
	t = "nagaramk"
	res := isAnagram(s, t)
	fmt.Println(res)
}

// time complexity o(s+t)
/*
func isAnagram(s, t string) bool {
	var countS = map[rune]int{}
	var countT = map[rune]int{}

	for _, val := range s {
		countS[val]++
	}
	for _, val := range t {
		countT[val]++
	}

	for _, val := range s {
		if countS[val] != countT[val] {
			return false
		}

	}
	return true

}
*/

// o(n)

func isAnagram(s, t string) bool {
	sSplit := strings.Split(s, "")
	tSplit := strings.Split(t, "")

	sort.Strings(sSplit)
	sort.Strings(tSplit)
	if strings.Join(sSplit, "") == strings.Join(tSplit, "") {
		return true
	}
	return false

}
