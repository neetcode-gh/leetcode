/**
 * @param {character[][]} board
 * @return {boolean}
 */
 var isValidSudoku = function(board) {
    const rows = new Set();
    const cols = new Set();
    const squares = new Set();
    
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board.length; col++) {
            const value = board[row][col]
            
            if (value === '.') {
                continue;
            }
            
            const squareXCoord = Math.floor(row / 3);
            const squareYCoord = Math.floor(col / 3);
            
            // Check if value already exists in current row/column/square
            if (
                rows.has(`${row}:${value}`)
                || cols.has(`${col}:${value}`)
                || squares.has(`${squareXCoord},${squareYCoord}:${value}`)
            ) {
                return false;
            }
            
            rows.add(`${row}:${value}`);
            cols.add(`${col}:${value}`);
            squares.add(`${squareXCoord},${squareYCoord}:${value}`);
            
        }
    }
    
    return true;    
};