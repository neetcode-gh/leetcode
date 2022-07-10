package twosumii

func twoSum(numbers []int, target int) []int {
	left := 0
	right := len(numbers) - 1
	currentSum := 0

	for left < right {
		currentSum = numbers[left] + numbers[right]
		if currentSum == target {
			return []int{left + 1, right + 1}
		} else if currentSum > target {
			//move the right pointer
			right -= 1
		} else {
			left += 1
		}
	}
	return nil
}
