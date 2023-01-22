func findAnagrams(s string, p string) []int {
	len_s, len_p := len(s), len(p)
	if len_p > len_s {
		return []int{}
	}

	ans := make([]int, 0, len_s)
	count_p, count_s := count(p), count(s[:len_p])

	if count_p == count_s {
		ans = append(ans, 0)
	}

	for i := len_p; i < len_s; i++ {
		count_s[int(s[i-len_p]-'a')]--
		count_s[int(s[i]-'a')]++
		if count_p == count_s {
			ans = append(ans, i-len_p+1)
		}
	}

	return ans
}

func count(s string) [26]int {
	arr := [26]int{}
	for _, r := range []rune(s) {
		arr[int(r-'a')]++
	}
	return arr
}