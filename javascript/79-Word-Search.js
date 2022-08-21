function dfs(board, i, j, remain) {
    if (remain === '') return true;
    if (i < 0 || i >= board.length || j < 0 || j >= board[0].length)
        return false;
    if (board[i][j] !== remain[0]) return false;

    let temp = board[i][j];
    board[i][j] = '-';

    let result =
        dfs(board, i - 1, j, remain.slice(1)) ||
        dfs(board, i + 1, j, remain.slice(1)) ||
        dfs(board, i, j - 1, remain.slice(1)) ||
        dfs(board, i, j + 1, remain.slice(1));

    board[i][j] = temp;
    return result;
}

var exist = function (board, word) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            if (dfs(board, i, j, word)) {
                return true;
            }
        }
    }
    return false;
};
