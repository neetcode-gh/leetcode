var cache map[[2]int]bool
var st1 string
var st2 string
var st3 string

func isInterleave(s1 string, s2 string, s3 string) bool {
	if len(s1)+len(s2) != len(s3) {
		return false
	}
	cache = make(map[[2]int]bool)
	st1 = s1
	st2 = s2
	st3 = s3
	return dfs(0, 0)
}

func dfs(i, j int) bool {
	if i >= len(st1) && j >= len(st2) {
		return true
	}

	val, ok := cache[[2]int{i, j}]
	
	if ok {
		return val
	}
	
	if i < len(st1) && st1[i] == st3[i+j] && dfs(i+1, j) {
		return true
	}
	if j < len(st2) && st2[j] == st3[i+j] && dfs(i, j+1) {
		return true
	}
	
	cache[[2]int{i, j}] = false
	return false
}