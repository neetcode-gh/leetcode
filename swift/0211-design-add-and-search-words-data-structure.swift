/**
 * Question Link: https://leetcode.com/problems/design-add-and-search-words-data-structure/
 */

 class TrieNode {
    var children = [Character: TrieNode]()
    var isWord = false
}

class WordDictionary {
    let root: TrieNode

    init() {
        root = TrieNode()
    }
    
    func addWord(_ word: String) {
        var curr: TrieNode? = root
        for c in word {
            if curr?.children[c] == nil {
                curr?.children[c] = TrieNode()
            }
            curr = curr?.children[c]
        }
        curr?.isWord = true
    }
    
    func search(_ word: String) -> Bool {
        var word = Array(word)

        func dfs(j: Int, root: TrieNode) -> Bool {
            var curr: TrieNode? = root
            for i in j..<word.count {
                var c = word[i]
                if c == "." {
                    for child in curr!.children.values {
                        if dfs(j: i + 1, root: child) {
                            return true
                        }
                    }
                    return false
                } else {
                    if curr?.children[c] == nil {
                        return false
                    }
                    curr = curr?.children[c]
                }
            }
            return curr?.isWord == true
        }

        return dfs(j: 0, root: self.root)
    }
}

/**
 * Your WordDictionary object will be instantiated and called as such:
 * let obj = WordDictionary()
 * obj.addWord(word)
 * let ret_2: Bool = obj.search(word)
 */