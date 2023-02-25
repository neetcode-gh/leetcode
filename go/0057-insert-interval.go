func insert(intervals [][]int, newInterval []int) [][]int {

	res := [][]int{}

	for i, currInt := range intervals {
		currStart, currEnd := currInt[0], currInt[1]
		newIntStart, newIntEnd := newInterval[0], newInterval[1]

		if newIntEnd < currStart {
			res = append(res, newInterval)

			res = append(res, intervals[i:]...)

			return res
		} else if newIntStart > currEnd {

			res = append(res, currInt)

		} else {
			newInterval[0] = min(newIntStart, currStart)
			newInterval[1] = max(newIntEnd, currEnd)

		}
	}

	res = append(res, newInterval)

	return res

}
func min(a, b int) int {
	if a > b {
		return b
	}
	return a
}

func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}