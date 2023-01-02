type TrieNode struct {
    children map[byte]*TrieNode
    word bool
}

type WordDictionary struct {
    root *TrieNode
}


func Constructor() WordDictionary {
    return WordDictionary{root: &TrieNode{children: make(map[byte]*TrieNode)}}
}


func (this *WordDictionary) AddWord(word string)  {
    cur := this.root
    for c := 0; c < len(word); c++ {
        if _, ok := cur.children[word[c]]; !ok {
            cur.children[word[c]] = &TrieNode{children: make(map[byte]*TrieNode)}
        }
        cur = cur.children[word[c]]
    }
    cur.word = true
}


func (this *WordDictionary) Search(word string) bool {
    var dfs func(int, *TrieNode) bool
    dfs = func(j int, root *TrieNode) bool {
        cur := root
        
        for i := j; i < len(word); i++ {
            c := word[i]
            if c == '.' {
                for _, child := range cur.children {
                    if dfs(i + 1, child) {
                        return true
                    }
                }
                return false
            } else {
                if _, ok := cur.children[c]; !ok {
                    return false
                }
                cur = cur.children[c]
            }
        }
        return cur.word
    }
    
    return dfs(0, this.root)
}
