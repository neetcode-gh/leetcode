package main

import "strconv"

func main() {

}

func restoreIpAddresses(s string) []string {
	res := []string{}

	if len(s) > 12 {
		return res
	}

	var backtrack func(i, dots int, currentIP string)

	backtrack = func(i, dots int, currentIP string) {
		if dots == 4 && i == len(s) {
			res = append(res, currentIP[:len(currentIP)-1])
			return
		} else if dots > 4 {
			return
		}


		for j := i; j < min(i+3, len(s)); j++ {
			val, _ := strconv.Atoi(s[i:j+1])
			if  val < 256 && (i == j || s[i] != '0') {
				backtrack(j+1 , dots + 1, currentIP + s[i:j+1] + ".")
			}
		}
	}

	backtrack(0,0,"")
	return res
}

func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}