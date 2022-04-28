package main

import (
	"fmt"
)

func main() {
	var prices = []int{7, 1, 5, 3, 6, 4}
	fmt.Println(maxProfit(prices))

}

func maxProfit(prices []int) int {
	// initialize two pointers at 0 and 1 and slide the right pointer to check new profit everytime.
	// if the value at the rightpointer is low, then move the leftpointer as you can get higher profit when you buy low
	leftPointer := 0
	rightPointer := 1
	max := 0
	for rightPointer < len(prices) {
		if prices[leftPointer] < prices[rightPointer] {
			profit := prices[rightPointer] - prices[leftPointer]
			if profit > max {
				max = profit
			}
		} else {
			leftPointer++
		}
		rightPointer++
	}
	return max

}
