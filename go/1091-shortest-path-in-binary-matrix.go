func shortestPathBinaryMatrix(grid [][]int) int {
	rows, cols := len(grid), len(grid[0])
	// if top-left or bottom-right == 1
	// there is no clear path
	if grid[0][0] == 1 || grid[rows-1][cols-1] == 1 {
		return -1
	}

	seen := make(map[[2]int]bool)
	seen[[2]int{0, 0}] = true
	queue := make([][3]int, 0)
	queue = append(queue, [3]int{0, 0, 1})

	for len(queue) > 0 {
		cell := queue[0]
		queue = queue[1:]
		r, c, d := cell[0], cell[1], cell[2]
		// if we reached bottom-right
		// returns the current distance
		if r == rows-1 && c == cols-1 {
			return d
		}
		// 8-directionally connected cells
		adjCells := [][2]int{{0, -1}, {0, 1}, {-1, 0}, {1, 0}, {-1, -1}, {1, 1}, {-1, 1}, {1, -1}}
		for _, adjc := range adjCells {
			rr, cc := r+adjc[0], c+adjc[1]
			if rr < 0 || rr >= rows || cc < 0 || cc >= cols || grid[cc][rr] == 1 || seen[[2]int{rr, cc}] {
				continue
			}
			queue = append(queue, [3]int{rr, cc, d + 1})
			seen[[2]int{rr, cc}] = true
		}
	}
	return -1
}
