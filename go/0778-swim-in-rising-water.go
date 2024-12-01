var dirs = []int{0, 1, 0, -1, 0}

func swimInWater(grid [][]int) int {
	gridSize := len(grid)
	minTime, maxTime := grid[0][0], gridSize*gridSize-1

	for minTime < maxTime {
		middleTime := minTime + (maxTime-minTime)/2
		visited := initVisitedArray(gridSize)
		if canReach(grid, visited, 0, 0, gridSize, middleTime) {
			maxTime = middleTime
		} else {
			minTime = middleTime + 1
		}
	}
	return minTime
}

func initVisitedArray(gridSize int) [][]bool {
	visited := make([][]bool, gridSize)
	for i := range visited {
		visited[i] = make([]bool, gridSize)
	}
	return visited
}

func canReach(grid [][]int, visited [][]bool, x, y, gridSize, level int) bool {
	visited[x][y] = true
	for i := 0; i < 4; i++ {
		newX, newY := x+dirs[i], y+dirs[i+1]
		if !isValidMove(newX, newY, gridSize) {
			continue
		}
		if visited[newX][newY] || grid[newX][newY] > level {
			continue
		}
		if newX == gridSize-1 && newY == gridSize-1 {
			return true
		}
		if canReach(grid, visited, newX, newY, gridSize, level) {
			return true
		}
	}
	return false
}

func isValidMove(x, y, gridSize int) bool {
	if y < 0 || x < 0 || y >= gridSize || x >= gridSize {
		return false
	}
	return true
}
