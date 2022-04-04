package arrayAndHashing

func containsDuplicate(nums []int) bool {
	freqMap := make(map[int]int)

	for i := 0; i < len(nums); i++ {
		if _, ok := freqMap[nums[i]]; ok {
			return true
		}
		freqMap[nums[i]] += 1
	}
	return false
}
