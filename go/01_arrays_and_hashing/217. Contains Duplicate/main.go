package main

import "fmt"

func main() {
	nums := []int{1, 2, 4, 4}
	result := containsDuplicate(nums)
	fmt.Println(result)
}

func containsDuplicate(nums []int) bool {
	hashmap := make(map[int]int8)

	for _, val := range nums {
		_, ok := hashmap[val]
		if ok {
			return true
		} else {
			hashmap[val] = 1
		}
	}
	return false
}
