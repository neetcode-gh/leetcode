import "math"

const (
	empty = math.MaxInt32
	gate  = 0
)

var directions = [4][2]int{
	{1, 0},
	{-1, 0},
	{0, 1},
	{0, -1},
}

func wallsAndGates(rooms [][]int) {
	if len(rooms) == 0 || len(rooms[0]) == 0 {
		return
	}

	queue := findGatesCoordinates(rooms)

	rowLength, columnLength := len(rooms), len(rooms[0])

	for len(queue) > 0 {
		coordinates := queue[0]
		queue = queue[1:]
		row, col := coordinates[0], coordinates[1]

		for _, direction := range directions {
			currentRow := row + direction[0]
			currentCol := col + direction[1]
			isOutOfBounds := currentRow < 0 || currentCol < 0 || currentRow >= rowLength || currentCol >= columnLength

			if !isOutOfBounds && rooms[currentRow][currentCol] == empty {
				rooms[currentRow][currentCol] = rooms[row][col] + 1
				queue = append(queue, []int{currentRow, currentCol})
			}
		}
	}
}

func findGatesCoordinates(rooms [][]int) [][]int {
	queue := [][]int{}
	for row := range rooms {
		for col := range rooms[row] {
			if rooms[row][col] == gate {
				queue = append(queue, []int{row, col})
			}
		}
	}

	return queue
}