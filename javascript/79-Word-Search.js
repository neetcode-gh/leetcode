/**
 * https://leetcode.com/problems/word-search/
 * Time O(N * 3^L) | Space O(L)
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function(board, word) {
    for(let row = 0; row < board.length; row++) {
        for(let col = 0; col < board[0].length; col++){
            if (dfs(board, row, col, word, 0)) return true;
        }
    }

    return false;
}

const dfs = (board, row, col, word, index) => {
    if (index === word.length) return true;
    if (isOutOfBound(board, row, col)) return false;
    if (board[row][col] !== word[index]) return false
        
    board[row][col] = '*';
    
    const hasWord = Object
        .values(directions(row, col))
        .filter(([r, c]) => dfs(board, r, c, word, index + 1))
        .length
    
    board[row][col] = word[index];
    return hasWord;
}

const isOutOfBound = (board, row, col) => {
    const isRowOutOfBound = row < 0 || board.length - 1 < row
    const isColOutOfBound = col < 0 || board[0].length - 1 < col 
    return isRowOutOfBound || isColOutOfBound
}

const directions = (row, col) => ({
    up: [row - 1, col],
    down: [row + 1, col],
    left: [row, col - 1,],
    right: [row, col + 1]
})
