/**
 * @param {character[][]} board
 * @param {string[]} words
 * Time O((ROWS * COLS) * (4 * (3 ^ (WORDS - 1)))) | Space O(N)
 * @return {string[]}
 */
var findWords = function (board, words) {
    return new Trie(words).searchBoard(board);
};

class TrieNode {
    constructor() {
        this.children = {};
        this.word = '';
    }
}

class Trie {
    constructor(words) {
        this.root = new TrieNode();
        words.forEach((word) => this.insert(word));
    }

    /* Time O(N) | Space O(N) */
    insert(word, node = this.root) {
        for (const char of word) {
            const child = node.children[char] || new TrieNode();

            node.children[char] = child;

            node = child;
        }

        node.word = word;
    }

    /* Time O((ROWS * COLS) * (4 * (3 ^ (WORDS - 1)))) | Space O(N) */
    searchBoard(board, node = this.root, words = []) {
        const [rows, cols] = [board.length, board[0].length];

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                this.dfs(board, row, rows, col, cols, node, words);
            }
        }

        return words;
    }

    dfs(board, row, rows, col, cols, node, words) {
        const char = board[row][col];
        const child = node.children[char] || null;

        if (this.canSkip(char, child)) return;

        node = child;
        this.checkWord(node, words);
        this.backTrack(board, row, rows, col, cols, node, words);
    }

    canSkip(char, child) {
        const hasSeen = char === '#';
        const isMissingChild = !child;

        return hasSeen || isMissingChild;
    }

    checkWord(node, words) {
        if (!node.word.length) return;

        words.push(node.word);
        node.word = '';
    }

    backTrack(board, row, rows, col, cols, node, words) {
        const char = board[row][col];

        board[row][col] = '#';

        for (const [_row, _col] of this.getNeighbors(row, rows, col, cols)) {
            this.dfs(board, _row, rows, _col, cols, node, words);
        }

        board[row][col] = char;
    }

    getNeighbors(row, rows, col, cols) {
        return [
            [row - 1, col],
            [row + 1, col],
            [row, col - 1],
            [row, col + 1],
        ].filter(([_row, _col]) => !this.isOutOfBounds(_row, rows, _col, cols));
    }

    isOutOfBounds(row, rows, col, cols) {
        const isRowOut = row < 0 || rows <= row;
        const isColOut = col < 0 || cols <= col;

        return isRowOut || isColOut;
    }
}
