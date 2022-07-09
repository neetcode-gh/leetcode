package longestconsecutivesequence

import "fmt"

func buildSet(nums []int) map[int]bool {
	set := make(map[int]bool)
	for _, val := range nums {
		set[val] = true
	}
	return set
}

func calculateConsecutiveSequence(value int, set map[int]bool) int {
	length := 1
	currVal := value
	for {
		currVal += 1
		_, ok := set[currVal]
		if ok {
			length += 1
		} else {
			break
		}
	}
	return length
}

func longestConsecutive(nums []int) int {
	maxConsecutiveLength := 0
	set := buildSet(nums)

	for i := 0; i < len(nums); i++ {
		_, ok := set[nums[i]-1]
		if !ok {
			fmt.Println("Left is not present => start of a sequence")
			currLongestConsecutiveLength := calculateConsecutiveSequence(nums[i], set)
			maxConsecutiveLength = max(maxConsecutiveLength, currLongestConsecutiveLength)
		}
	}
	return maxConsecutiveLength
}

func max(i int, j int) int {
	if i > j {
		return i
	}
	return j
}
