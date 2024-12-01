package main

import "math"

func main() {

}

func shuffle(nums []int, n int) []int {
	for i := 0; i < n; i++ {
		nums[i] = nums[i] << 10
		nums[i] = nums[i] | nums[i+n]
	}

	j := 2*n - 1

	for i := n - 1; i > -1; i-- {
		y := nums[i] & (int(math.Pow(2.,10.)) - 1)
		x := nums[i] >> 10
		nums[j] = y
		nums[j-1] = x
		j -= 2
	}
	return nums
}