/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function (board) {
    const rows = {};
    const cols = {};
    const squares = {};

    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {

            if (board[r][c] == '.') continue;

            const grid = ((r / 3) >> 0) + '' + ((c / 3) >> 0);

            if (!cols[c]) cols[c] = new Set();
            if (!rows[r]) rows[r] = new Set();
            if (!squares[grid]) squares[grid] = new Set();

            if (rows[r].has(board[r][c]) || cols[c].has(board[r][c]) || squares[grid].has(board[r][c])) {
                return false;
            }

            cols[c].add(board[r][c])
            rows[r].add(board[r][c])
            squares[grid].add(board[r][c])
        }
    }

    return true;

};

