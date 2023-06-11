func arraySign(nums []int) int {
	productSign := 1
	for _, num := range nums {
		productSign *= signFunc(num)
	}
	return productSign
}

func signFunc(x int) int {
	if x < 0 {
		return -1
	} else if x > 0 {
		return 1
	} else {
		return 0
	}
}