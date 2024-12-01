package main

func main() {

}

func addToArrayForm(num []int, k int) []int {
	// Reverse
	for i, j := 0, len(num)-1; i < j; i, j = i+1, j-1 {
		num[i], num[j] = num[j], num[i]
	}
	i := 0

	for k > 0 {
		digit := k % 10

		if i < len(num) {
			num[i] += digit
		} else {
			num = append(num, digit)
		}

		carry := num[i] / 10
		num[i] %= 10

		k /= 10
		k += carry
		i++
	}

	// Reverse
	for i2, j := 0, len(num)-1; i2 < j; i2, j = i2+1, j-1 {
		num[i2], num[j] = num[j], num[i2]
	}

	return num
}