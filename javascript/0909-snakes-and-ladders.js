/**
 * @param {number[][]} board
 * @return {number}
 */
var snakesAndLadders = function(board) {
    let n = board.length;
    let set = new Set();
    let getPos = (pos) => {
        let row = Math.floor((pos - 1) / n)
        let col = (pos - 1) % n
        col = row % 2 == 1 ? n - 1 - col : col;
        row = n - 1 - row;
        return [row, col]
    }
    let q = [[1, 0]]
    while (q.length > 0){
        [pos, moves] = q.shift();
        for (let i = 1; i < 7; i++){
            let newPos = i + pos;
            let [r, c] = getPos(newPos);
            if (board[r][c] != -1 ) newPos = board[r][c]
            if (newPos == n * n) return moves + 1;
            if (!set.has(newPos)) {
                set.add(newPos)
                q.push([newPos, moves + 1])
            }
        }
    }
    return -1   
};
