package main

import (
	"fmt"
)

func main() {
	s := "(){}[]"
	fmt.Println(validParentheses(s))
}

func validParentheses(s string) bool {
	var val = []byte{}
	var bracketMap = map[byte]byte{')': '(', '}': '{', ']': '['}

	for i := range s {
		if len(val) == 0 && (s[i] == ')' || s[i] == '}' || s[i] == ']') {
			return false
		}
		switch s[i] {
		case ')', '}', ']':
			if val[len(val)-1] == bracketMap[s[i]] {
				val = val[:len(val)-1]
			} else {
				return false
			}
		case '(', '[', '{':
			val = append(val, s[i])
		default:
			return false
		}
	}
	if len(val) == 0 {
		return true
	}
	return false

}

/*

func validParentheses(s string) bool {
	var val = []byte{}

	for i := range s {
		if len(val) == 0 && (s[i] == ')' || s[i] == '}' || s[i] == ']') {
			return false
		}
		switch s[i] {
		case ')':
			if val[len(val)-1] == '(' {
				val = val[:len(val)-1]
			} else {
				return false
			}
		case '}':
			if val[len(val)-1] == '{' {
				val = val[:len(val)-1]
			} else {
				return false
			}
		case ']':
			if val[len(val)-1] == '[' {
				val = val[:len(val)-1]
			} else {
				return false
			}
		case '(', '[', '{':
			val = append(val, s[i])
		default:
			return false
		}
	}
	if len(val) == 0 {
		return true
	}
	return false

}

*/

/*

// order is not important ; time complexity o(n); o(n) space complexity
func validParentheses(s string) bool {
	val := map[byte]int{}
	for i := range s {
		if (s[i] == ')' && val['('] == 0) || (s[i] == '}' && val['{'] == 0) || (s[i] == ']' && val['['] == 0) {
			return false
		}
		switch s[i] {
		case '(':
			val['(']++
		case ')':
			val['(']--
		case '[':
			val['[']++
		case ']':
			val['[']--
		case '{':
			val['{']++
		case '}':
			val['{']--
		default:
			return false
		}
	}
	if val['('] == 0 && val['['] == 0 && val['{'] == 0 {
		return true
	}
	return false
}

*/
