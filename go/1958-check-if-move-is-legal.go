const ROW = 0
const COL = 1
func checkMove(board [][]byte, rMove int, cMove int, color byte) bool {
    ROWS, COLS := len(board), len(board[0])
    direction := [][]int{{1, 0}, {-1, 0}, {0, 1}, {0, -1},
                           {1, 1}, {-1, -1}, {1, -1}, {-1, 1}}
    board[rMove][cMove] = color
    
    legal := func(row, col int, color byte, direc []int) bool {
        dr, dc := direc[ROW], direc[COL]
        row, col = row + dr, col + dc
        length := 1
        
        for 0 <= row && row < ROWS && 0 <= col && col < COLS {
            length += 1
            if board[row][col] == '.' {
                return false
            } else if(board[row][col] == color) {
                return length >= 3
            }
            row, col = row + dr, col + dc
        }
        return false
    }
    
    for _, d := range direction {
        if legal(rMove, cMove, color, d) {
            return true
        }
    }
    return false
}
