import "sort"

func kthLargestNumber(nums []string, k int) string {
	sort.Slice(nums, func(i, j int) bool {
		if len(nums[i]) != len(nums[j]) {
			return len(nums[i]) > len(nums[j])
		}
		for idx := range nums[i] {
			if nums[i][idx] != nums[j][idx] {
				return nums[i][idx] > nums[j][idx]
			}
		}
		return true
	})
	return nums[k-1]
}
