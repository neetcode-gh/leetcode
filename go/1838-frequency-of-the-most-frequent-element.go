import (
	"math"
	"sort"
)

func maxFrequency(nums []int, k int) int {
	sort.Ints(nums)

	left, right, res, total := 0,0,0,0

	for right < len(nums) {
		total += nums[right]

		for nums[right] * (right - left +1) > total + k {
			total -= nums[left]
			left++
		}

		res = int(math.Max(float64(res), float64(right - left + 1)))
		right++
	}

	return res
}