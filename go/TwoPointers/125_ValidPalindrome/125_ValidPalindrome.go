package validpalindrome

import (
	"fmt"
	"log"
	"regexp"
	"strings"
)

func isPalindrome(s string) bool {
	s = strings.ToLower(s)
	s = strings.Replace(s, " ", "", -1)
	reg, err := regexp.Compile("[^a-z0-9]+")
	if err != nil {
		log.Fatal(err)
	}
	s = reg.ReplaceAllString(s, "")
	fmt.Println(s)
	leftPointer := 0
	rightPointer := len(s) - 1
	for leftPointer <= rightPointer {
		if s[leftPointer] != s[rightPointer] {
			return false
		}
		leftPointer++
		rightPointer--
	}
	return true
}
