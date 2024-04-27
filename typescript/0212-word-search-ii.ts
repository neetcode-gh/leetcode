class TrieNode {
    children = new Array<string>(26);
    word = false;
}

class Trie {
    root = new TrieNode();

    add(word: string) {
        let current = this.root;
        for (let c of word) {
            if (!current.children[c]) current.children[c] = new TrieNode();
            current = current.children[c];
        }

        current.word = true;
    }
}

function findWords(board: string[][], words: string[]): string[] {
    const trie = new Trie();
    for (let word of words) {
        trie.add(word);
    }

    const rows = board.length;
    const cols = board[0].length;
    const resultSet = new Set<string>();

    function dfs(r: number, c: number, node: TrieNode, word: string) {
        if (r < 0 || r >= rows) return;
        if (c < 0 || c >= cols) return;
        if (board[r][c] === '.') return;

        const currentChar = board[r][c];
        const currentNode = node.children[currentChar];
        if (!currentNode) return;
        
        const currentWord = word + currentChar;
        if (currentNode.word) {
            resultSet.add(currentWord);
        }

        const directions = [
            [r - 1, c],
            [r, c + 1],
            [r + 1, c],
            [r, c - 1],
        ];
        for (let [nr, nc] of directions) {
            dfs(nr, nc, currentNode, currentWord);
        }

        board[r][c] = '.';
        board[r][c] = currentChar;
    }

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            dfs(r, c, trie.root, '');
        }
    }

    return [...resultSet];
};
