func backtrack(n, k, start int, arr []int, ans *[][]int) {
	if len(arr) == k {
		comb := make([]int, k)
		copy(comb, arr)
		*ans = append(*ans, comb)
		return
	}
	for i := start; i <= n-k+(len(arr)+1); i++ {
		arr = append(arr, i)
		backtrack(n, k, i+1, arr, ans)
		arr = arr[:len(arr)-1]
	}
}

func combine(n int, k int) [][]int {
	ans := [][]int{}
	backtrack(n, k, 1, []int{}, &ans)
	return ans
}
