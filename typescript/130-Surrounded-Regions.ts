/**
 Do not return anything, modify board in-place instead.
 */
function solve(board: string[][]): void {
    const rowLen = board.length;
    const colLen = board[0].length;
    const lastRow = rowLen - 1;
    const lastCol = colLen - 1;

    for (let r = 0; r < rowLen; ++r) {
        markSeen(r, 0);
        markSeen(r, lastCol);
    }
    for (let c = 1; c < lastCol; ++c) {
        markSeen(0, c);
        markSeen(lastRow, c);
    }

    for (let r = 0; r < rowLen; ++r) {
        for (let c = 0; c < colLen; ++c) {
            switch (board[r][c]) {
                case 'O':
                    board[r][c] = 'X';
                    break;
                case 'A':
                    board[r][c] = 'O';
                    break;
            }
        }
    }

function markSeen(r: number, c: number): void {
        if (!inBounds(r, c) || board[r][c] !== 'O') {
            return;
        }

        board[r][c] = 'A';

        markSeen(r - 1, c);
        markSeen(r + 1, c);
        markSeen(r, c - 1);
        markSeen(r, c + 1);
}

function inBounds(r: number, c: number): boolean {
        return r >= 0 && c >= 0 && r < rowLen && c < colLen;
}
};