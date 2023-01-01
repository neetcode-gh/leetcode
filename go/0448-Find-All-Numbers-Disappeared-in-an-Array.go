/*
The idea is to use cyclic sort
hint: all integers are in the range [1, n]
time: O(n) space: O(n)
*/

func findDisappearedNumbers(nums []int) []int {
	res := []int{}
	i := 0
	for i < len(nums) {
		j := nums[i] - 1
		if nums[i] != nums[j] {
			nums[i], nums[j] = nums[j], nums[i]
		} else {
			i++
		}
	}

	for i = 0; i < len(nums); i++ {
		if nums[i] != i+1 {
			res = append(res, i+1)
		}
	}

	return res
}
