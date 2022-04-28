package main

import "fmt"

func main() {
	var nums = []int{1, 2, 2, 7}

	val := containsDuplicate(nums)
	fmt.Println(val)
}

/*
// time complexity - o(n2); algorithm space complexity - o(1)
func containsDuplicate(num []int) bool {
	for i := range num {
		for j := i + 1; j < len(num); j++ {
			if num[i] == num[j] {
				return true
			}
		}

	}
	return false

}
*/

// time complexity - o(n) ; space complexity - o(n)

func containsDuplicate(num []int) bool {
	var val = map[int]int{}
	for _, value := range num {
		val[value]++
		if val[value] > 1 {
			return true
		}
	}
	return false
}
