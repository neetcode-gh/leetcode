func bagOfTokensScore(tokens []int, power int) int {
	res, score := 0, 0
	sort.Ints(tokens)

	l, r := 0, len(tokens)-1
	for l <= r {
		if power >= tokens[l] {
			power -= tokens[l]
			l += 1
			score += 1
			res = max(res, score)
		} else if score > 0 {
			power += tokens[r]
			r -= 1
			score -= 1
		} else {
			break
		}
	}
	return res
}
