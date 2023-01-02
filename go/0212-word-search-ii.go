type TrieNode struct {
    children map[byte]*TrieNode
    isWord bool
    refs int
}

func (this *TrieNode) addWord(word string) {
    cur := this
    cur.refs += 1
    for c := 0; c < len(word); c++ {
        if _, ok := cur.children[word[c]]; !ok {
            cur.children[word[c]] = &TrieNode{children: make(map[byte]*TrieNode)}
        }
        cur = cur.children[word[c]]
        cur.refs += 1
    }
    cur.isWord = true
}

func (this *TrieNode) removeWord(word string) {
    cur := this
    cur.refs += 1
    for c := 0; c < len(word); c++ {
        if _, ok := cur.children[word[c]]; ok {
            cur = cur.children[word[c]];
            cur.refs -= 1
        }
    }
}

func findWords(board [][]byte, words []string) []string {
    root := &TrieNode{children: make(map[byte]*TrieNode)}
    for _, w := range words {
        root.addWord(w);
    }
    
    ROWS, COLS := len(board), len(board[0])
    res := make(map[string]bool)
    visit := make(map[int]bool)
    
    var dfs func(int, int, *TrieNode, string)
    dfs = func(r, c int, node *TrieNode, word string) {
        if
            r < 0 || r >= ROWS ||
            c < 0 || c >= COLS ||
            node.children[board[r][c]] == nil ||
            node.children[board[r][c]].refs < 1 ||
            visit[r*COLS + c] {
            return
        }
        
        visit[r*COLS + c] = true
        node = node.children[board[r][c]]
        word += string(board[r][c])
        if node.isWord {
            node.isWord = false
            res[word] = true
            root.removeWord(word)
        }
        
        dfs(r + 1, c, node, word)
        dfs(r - 1, c, node, word)
        dfs(r, c + 1, node, word)
        dfs(r, c - 1, node, word)
        visit[r*COLS + c] = false
    }
    
    for r := 0; r < ROWS; r++ {
        for c := 0; c < COLS; c++ {
            dfs(r, c, root, "")
        }
    }
    return list(res)
}

func list(mapping map[string]bool) []string {
    res := make([]string, 0, len(mapping))
    for key, _ := range mapping {
        res = append(res, key)
    }
    return res
}
