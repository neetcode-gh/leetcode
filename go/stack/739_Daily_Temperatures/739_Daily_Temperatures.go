package dailytemperatures

type keyPair struct {
	index int
	value int
}

func dailyTemperatures(temperatures []int) []int {
	result := make([]int, len(temperatures))
	var stack []keyPair
	for key, value := range temperatures {
		// check if the current value in temperatures is greater than the top of the stack value
		// if yes then for the index of the top the stack assign value (currIndex - indexAtTop). This gives the number of days until we found a greater value
		// pop the value from the stack since we assigned the number of days
		// add the current value and index to the stack
		for len(stack) > 0 && value > stack[len(stack)-1].value {
			result[stack[len(stack)-1].index] = key - stack[len(stack)-1].index
			stack = stack[:len(stack)-1]
		}
		stack = append(stack, keyPair{
			index: key,
			value: value,
		})
	}
	// for remaining elements we can simply assign them 0
	for len(stack) > 0 {
		result[stack[len(stack)-1].index] = 0
		stack = stack[:len(stack)-1]
	}
	return result
}
