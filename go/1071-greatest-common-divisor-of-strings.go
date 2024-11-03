package main

import "strings"

func main() {

}

func gcdOfStrings(str1 string, str2 string) string {
	len1, len2 := len(str1), len(str2)
	var isDivisor func(l int) bool

	isDivisor = func(l int) bool {
		if len1%l != 0 || len2%l != 0 {
			return false
		}

		f1, f2 := len1/l, len2/l

		return strings.Repeat(str1[:l], f1) == str1 && strings.Repeat(str1[:l], f2) == str2
	}

	for l := min(len1,len2); l > 0; l-- {
		if isDivisor(l) {
			return str1[:l]
		}
	}

	return ""
}

func min( a,b int) int {
	if a < b {
		return a
	}
	return b
}