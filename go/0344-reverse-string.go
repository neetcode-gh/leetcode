func reverseString(s []byte) {
	L, R := 0, len(s)-1

	for L < len(s)/2 {
		s[L], s[R] = s[R], s[L]
		L++
		R--
	}
}
