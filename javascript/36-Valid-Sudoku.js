/**
 * @param {character[][]} board
 * Time O(N^2) | Space O(N^2)
 * @return {boolean}
 */
var isValidSudoku = function(board) {
    const [ boxes, cols, rows ] = new Array(3)
        .fill().map(() => [ {}, {}, {}, {}, {}, {}, {}, {}, {} ]);

    for (let row = 0; row < 9; row++) {              
        for (let col = 0; col < 9; col++) {            
            const digit = board[row][col];
            const k = (Math.floor(row / 3) * 3) + Math.floor(col / 3);

            const isEmpty = digit === '.';
            if (isEmpty) continue;

            const hasMoved = boxes[k][digit] || cols[col][digit] || rows[row][digit];
            if (hasMoved) return false;

            boxes[k][digit] = cols[col][digit] = rows[row][digit] = true;       
        }
    }

    return true;
};


