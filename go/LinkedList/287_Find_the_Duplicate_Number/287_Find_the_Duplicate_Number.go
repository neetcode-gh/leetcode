package findtheduplicatenumber

func findDuplicate(nums []int) int {
	tortoise, hare := nums[0], nums[0]

	for {
		tortoise = nums[tortoise]
		hare = nums[nums[hare]]
		if tortoise == hare {
			break
		}
	}
	tortoise = nums[0]
	for tortoise != hare {
		tortoise = nums[tortoise]
		hare = nums[hare]
	}
	return hare
}
