class Solution {
    private static int COLS;
    private static int ROWS;
    private Trie currentTrie;

    public List<String> findWords(char[][] board, String[] words) {
        Trie root = new Trie();
        for (String word : words) {
            root.addWord(word);
        }

        ROWS = board.length;
        COLS = board[0].length;
        HashSet<String> res = new HashSet<>();
        HashSet<String> visit = new HashSet<>();

        for (int r = 0; r<ROWS; r++) {
            for(int c = 0; c < COLS; c++) {
                dfs(r, c, root, "", res, visit, board, root);
            }
        }
        return new ArrayList<>(res);
    }

    public void dfs(int r, int c, Trie node, String word, HashSet<String> res, HashSet<String> visit, char[][] board, Trie root) {
        if (r < 0
        || c < 0
        || r == ROWS
        || c == COLS
        || !node.children.containsKey(board[r][c])
        || node.children.get(board[r][c]).refs < 1
        || visit.contains(r + "-" + c)
        ) {
            return;
        }

        visit.add(r + "-" + c);
        node = node.children.get(board[r][c]);
        word += board[r][c];
        if (node.isWord) {
            node.isWord = false;
            res.add(word);
            root.removeWord(word);
        }

        dfs(r + 1, c, node, word, res, visit, board, root);
        dfs(r - 1, c, node, word, res, visit, board, root);
        dfs(r, c + 1, node, word, res, visit, board, root);
        dfs(r, c - 1, node, word, res, visit, board, root);
        visit.remove(r + "-" + c);
    }

    class Trie {
        public HashMap<Character, Trie> children;
        public boolean isWord;
        public int refs = 0;

        public Trie() {
            children = new HashMap<>();
        }

        public void addWord(String word) {
            currentTrie = this;
            currentTrie.refs += 1;
            for (int i = 0; i < word.length(); i++) {
                char currentCharacter = word.charAt(i);
                if (!currentTrie.children.containsKey(currentCharacter)) {
                    currentTrie.children.put(currentCharacter, new Trie());
                }
                currentTrie = currentTrie.children.get(currentCharacter);
                currentTrie.refs += 1;
            }
            currentTrie.isWord = true;
        }

        public void removeWord(String word) {
            currentTrie = this;
            currentTrie.refs -= 1;
            for (int i = 0; i < word.length(); i++) {
                char currentCharacter = word.charAt(i);
                if (currentTrie.children.containsKey(currentCharacter)) {
                    currentTrie = currentTrie.children.get(currentCharacter);
                    currentTrie.refs -= 1;
                }
            }
        }
    }
}
