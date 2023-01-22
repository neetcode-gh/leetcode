var checkMove = function(board, rMove, cMove, color) {
    const ROWS = board.length, COLS = board[0].length;
    let direction = [[1, 0], [-1, 0], [0, 1], [0, -1],
                     [1, 1], [-1, -1], [1, -1], [-1, 1]];
    board[rMove][cMove] = color;
    
    let legal = function(row, col, color, direc) {
        let dr = direc[0], dc = direc[1];
        row = row + dr;
        col = col + dc;
        let length = 1;
        
        while(0 <= row && row < ROWS && 0 <= col && col < COLS) {
            length += 1;
            if(board[row][col] == '.') return false;
            if(board[row][col] == color)
                return length >= 3;
            row = row + dr;
            col = col + dc;
        }
        return false;
    }
    
    for(const d of direction)
        if(legal(rMove, cMove, color, d)) return true;
    return false;
};
