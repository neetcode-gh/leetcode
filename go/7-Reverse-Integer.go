package leetcode

import (
	"fmt"
	"math"
	"strconv"
)

func reverseString(s string) string {
	runes := []rune(s)
	for i, j := 0, len(runes)-1; i < j; i, j = i+1, j-1 {
		runes[i], runes[j] = runes[j], runes[i]
	}
	return string(runes)
}

func reverse(x int) int {

	str := reverseString(strconv.Itoa(int(math.Abs(float64(x)))))

	result, err := strconv.Atoi(str)

	if err != nil {
		fmt.Println(err.Error())
	}

	if x < 0 {
		result = 0 - result
	}

	if result < 0-int(math.Pow(2, 31)) || result > int(math.Pow(2, 31)-1) {
		return 0
	}

	return result
}
