package topKFrequent

import "fmt"

func main() {
	nums := []int{4, 1, -1, 2, -1, 2, 3}
	k := 2
	result := topKFrequent(nums, k)
	fmt.Println("result", result)
}

func getElementFrequencyMap(nums []int) map[int]int {
	freqMap := make(map[int]int)
	for _, value := range nums {
		_, ok := freqMap[value]
		if !ok {
			freqMap[value] = 1
		} else {
			freqMap[value] += 1
		}
	}
	return freqMap
}

func topKFrequent(nums []int, k int) []int {
	var result []int
	freqMap := getElementFrequencyMap(nums)
	fmt.Println(freqMap)

	//bucket sort
	bucket := make([][]int, len(nums)+1)
	for key, value := range freqMap {
		bucket[value] = append(bucket[value], key)
	}

	i := len(bucket) - 1
	for i >= 0 {
		if len(bucket[i]) > 0 {
			result = append(result, bucket[i]...)
			if len(result) >= k {
				return result[:k]
			}
		}
		i--
	}
	return result
}
