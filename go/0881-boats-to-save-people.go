func numRescueBoats(people []int, limit int) int {
	sort.Ints(people)

	res := 0 // boats
	l, r := 0, len(people)-1
	for l <= r {
		remain := limit - people[r]
		r -= 1
		res += 1
		if l <= r && remain >= people[l] {
			l += 1
		}
	}
	return res
}
