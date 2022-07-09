package main

import "fmt"

func main() {
	nums := []int{1, 2, 3, 4}
	result := productExceptSelf(nums)
	fmt.Println(result)
}

func getPrefixProduct(nums []int) []int {
	prefixProductArr := make([]int, len(nums))
	prefixProduct := 1
	for i := range nums {
		prefixProductArr[i] = prefixProduct * nums[i]
		prefixProduct = prefixProductArr[i]
	}
	return prefixProductArr
}

func getPostFixProduct(nums []int) []int {
	postFixProductArr := make([]int, len(nums))
	postFixProduct := 1
	i := len(nums) - 1
	for i >= 0 {
		postFixProductArr[i] = postFixProduct * nums[i]
		postFixProduct = postFixProductArr[i]
		i--
	}
	return postFixProductArr
}

func productExceptSelf(nums []int) []int {
	result := make([]int, len(nums))
	prefixProductArr := getPrefixProduct(nums)
	postFixProductArr := getPostFixProduct(nums)
	prefixValue := 1
	postFixValue := 1

	for i := range result {
		if i == 0 {
			prefixValue = 1
		} else {
			prefixValue = prefixProductArr[i-1]
		}
		if i < len(result)-1 {
			postFixValue = postFixProductArr[i+1]
		} else {
			postFixValue = 1
		}

		result[i] = prefixValue * postFixValue
	}
	return result
}

// 	For O(1) space solution we need to store the prefix Array as
//	[1, nums[0], nums[1]*nums[0], nums[2]*nums[1]*nums[0] ..... ]
// 	then we write a loop
//	 Initial postfix value will be 1
// 	for i >=0 {
//	  if i == len(nums) - 1 {
//	    postFix = 1
//	}else {
//		postFix *= nums[i+1]
//	}
//		result[i] = postFix * prefixArray[i]
//	}
