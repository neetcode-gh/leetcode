function isValidSudoku(board: string[][]): boolean {
    const rows = {};
    const cols = {};
    const squares = {};

    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            const num = board[r][c];

            if (num === '.') {
                continue;
            }

            const grid = `${Math.floor(r / 3)}${Math.floor(c / 3)}`;

            if (!cols[c]) {
                cols[c] = new Set();
            }
            if (!rows[r]) {
                rows[r] = new Set();
            }
            if (!squares[grid]) {
                squares[grid] = new Set();
            }

            if (
                rows[r].has(num) ||
                cols[c].has(num) ||
                squares[grid].has(num)
            ) {
                return false;
            }

            cols[c].add(num);
            rows[r].add(num);
            squares[grid].add(num);
        }
    }

    return true;
}
