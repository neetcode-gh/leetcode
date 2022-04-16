package leetcode

func dailyTemperatures(temperatures []int) []int {

	result := make([]int, 0)

	for i := 0; i < len(temperatures); i++ {
		for j := i; j < len(temperatures); j++ {
			if temperatures[i] < temperatures[j] {
				result = append(result, j-i)
				break
			}

			if j == len(temperatures)-1 {
				result = append(result, 0)
			}
		}
	}

	return result
}
