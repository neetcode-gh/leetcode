const mod = 1_000_000_007

func countVowelPermutation(n int) int {
	a, e, i, o, u := 1, 1, 1, 1, 1
	for k := 0; k < n-1; k++ {
		a, e, i, o, u = e%mod, (a+i)%mod, (a+e+o+u)%mod, (i+u)%mod, a%mod
	}
	return (a + e + i + o + u) % mod
}