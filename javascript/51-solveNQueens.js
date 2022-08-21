function solveNQueens(n) {
    let col = new Set();
    let posDiag = new Set(); // (r + c)
    let negDiag = new Set(); // (r - c)

    let board = new Array(n).fill().map(() => new Array(n).fill('.'));
    let res = [];

    function backtrack(r) {
        let temp = [];

        if (r === n) {
            for (let row of board) {
                temp.push(row.join(''));
            }

            res.push(temp);
            return;
        }

        for (let c = 0; c < n; c++) {
            if (col.has(c) || posDiag.has(r + c) || negDiag.has(r - c)) {
                continue;
            }

            col.add(c);
            posDiag.add(r + c);
            negDiag.add(r - c);
            board[r][c] = 'Q';

            backtrack(r + 1);

            col.delete(c);
            posDiag.delete(r + c);
            negDiag.delete(r - c);
            board[r][c] = '.';
        }
    }
    backtrack(0);
    return res;
}
