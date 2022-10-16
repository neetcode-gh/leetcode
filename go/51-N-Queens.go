package main

func solveNQueens(n int) [][]string {
	ans, curr := make([][]string, 0), make([]string, 0)
	column, diag1, diag2 := make(map[int]int), make(map[int]int), make(map[int]int)
	var backtrack func(y int)
	backtrack = func(y int) {
		if y == n {
			ans = append(ans, append([]string{}, curr...))
		}
		for x := 0; x < n; x++ {
			if column[x] > 0 || diag1[x+y] > 0 || diag2[n+x-y-1] > 0 {
				continue
			}
			column[x], diag1[x+y], diag2[n+x-y-1] = 1, 1, 1
			s := ""
			for i := 0; i < n; i++ {
				if i == x {
					s += "Q"
				} else {
					s += "."
				}
			}
			curr = append(curr, s)
			backtrack(y + 1)
			column[x], diag1[x+y], diag2[n+x-y-1] = 0, 0, 0
			curr = curr[:len(curr)-1]
		}
	}
	backtrack(0)
	return ans
}
