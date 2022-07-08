package arraysandhashing

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
