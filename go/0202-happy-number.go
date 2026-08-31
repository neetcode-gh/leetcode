func isHappy(n int) bool {
    seen := make(map[int]any)
	for n != 1 && !contains(seen, n) {
		seen[n] = struct{}{}
		n = getNext(n)
	}
	return n == 1
}

func getNext(num int) int {
	totalSum := 0
	for num > 0 {
		digit := num % 10
		totalSum += digit * digit
		num /= 10
	}
	return totalSum
}

func contains(set map[int]any, val int) bool {
	_, ok := set[val]
	return ok
}
