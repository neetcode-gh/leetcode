func minWindow(s string, t string) string {
	m := map[byte]int{}
	count := 0
	for _, v := range []byte(t) {
		if m[v] == 0 {
			count++
		}
		m[v]++
    }
	ans := ""
	c := 0
	for j, i := 0, 0; i < len(s); i++ {
		if m[s[i]] == 1 {
			c++
		}
		m[s[i]]--
		for m[s[j]] < 0 {
			m[s[j]]++
			j++
			if j > i {
				break
			}
		}
		if c == count {
			if ans == "" || len(ans) > i-j+1 {
				ans = s[j : i+1]
			}
		}
	}
	return ans
}
