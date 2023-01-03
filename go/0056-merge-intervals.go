import "sort"

func merge(intervals [][]int) [][]int {
	const (
		start = 0
		end   = 1
	)

	sort.SliceStable(intervals, func(i, j int) bool {
		return intervals[i][start] < intervals[j][start]
	})

	res := [][]int{intervals[0]}
	for i := 1; i < len(intervals); i++ {
		currResLastIndex := len(res) - 1
		currEnd := res[currResLastIndex]
		curr := intervals[i]

		if currEnd[end] < curr[start] {
			res = append(res, curr)
		} else if currEnd[end] < curr[end] {
			res[currResLastIndex][end] = curr[end]
		}
	}

	return res
}