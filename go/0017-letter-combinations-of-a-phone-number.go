package main

func letterCombinations(digits string) []string {
	ans := make([]string, 0)
	if len(digits) == 0 {
		return ans
	}
	m := make(map[byte]string)
	m['2'] = "abc"
	m['3'] = "def"
	m['4'] = "ghi"
	m['5'] = "jkl"
	m['6'] = "mno"
	m['7'] = "pqrs"
	m['8'] = "tuv"
	m['9'] = "wxyz"
	curr := ""
	var backtrack func(idx int)
	backtrack = func(idx int) {
		if len(curr) == len(digits) {
			ans = append(ans, curr)
			return
		}
		dig := digits[idx]
		str := m[dig]
		for i := 0; i < len(str); i++ {
			curr += string(str[i])
			backtrack(idx + 1)
			curr = curr[:len(curr)-1]
		}
	}
	backtrack(0)
	return ans
}
