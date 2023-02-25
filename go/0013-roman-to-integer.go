package main

func romanToInt(s string) int {
    letters := map[byte]int{'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000}
	length := len(s)
	var ans int
    for i := 0; i < length; i++ {
		if i+1 < length && letters[s[i]] < letters[s[i+1]] {
			ans -= letters[s[i]]
		} else {
			ans += letters[s[i]]
		}
	}
	return ans
}
