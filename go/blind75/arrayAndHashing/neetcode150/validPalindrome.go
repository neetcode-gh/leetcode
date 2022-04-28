package main

import (
	"fmt"
	"strings"
)

func main() {

	var s string
	//s = "A man, a plan, a canal: Panama"
	s = "race  d e car"
	//s = " "
	res := validPalindrome(s)
	fmt.Println(res)

}

// this function stores the value in a slice. basically space complexity is increased.
/*
func validPalindrome(s string) bool {
	reg, err := regexp.Compile("[^A-Za-z0-9]+")
	if err != nil {
		fmt.Println(err.Error())
	}
	sNew := reg.ReplaceAllString(s, "")
	sNew = strings.ToLower(sNew)

	//fmt.Println(sNew)
	sSlice := strings.Split(sNew, "")

	for i := 0; i < len(sSlice); i++ {
		if sSlice[i] != sSlice[len(sSlice)-i-1] {
			return false
		}
	}

	return true
}

*/

// the below function uses does not create a new slice

func validPalindrome(s string) bool {
	leftPointer := 0
	rightPointer := len(s) - 1

	for leftPointer < rightPointer {
		if !isAlphaNumeric(s[leftPointer]) {
			leftPointer++
			continue
		}
		if !isAlphaNumeric(s[rightPointer]) {
			rightPointer--
			continue
		}

		if strings.ToLower(string(s[leftPointer])) != strings.ToLower(string(s[rightPointer])) {
			return false
		}
		leftPointer++
		rightPointer--
	}
	return true
}

func isAlphaNumeric(s byte) bool {
	if ('a' <= s && s <= 'z') || ('A' <= s && s <= 'Z') || ('0' <= s && s <= '9') {
		return true
	}
	return false
}
