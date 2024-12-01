package main

func main() {

}

func tribonacci(n int) int {
	t := [3]int{0, 1, 1}

	if n < 3 {
		return t[n]
	}

	for i := 3; i < n+1; i++ {
		t[0], t[1], t[2] = t[1], t[2], sum(t)
	}

	return t[2]
}

func sum(arr [3]int) int {
	total := 0

	for _, val := range arr {
		total += val
	}

	return total
}