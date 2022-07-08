package TwoSum

func twoSum(nums []int, target int) []int {
	var seen = make(map[int]int)
	for i := range nums {
		item, exist := seen[target-nums[i]]
		if exist {
			return []int{i, item}
		}
		seen[nums[i]] = i
	}
	return []int{0, 0}
}
