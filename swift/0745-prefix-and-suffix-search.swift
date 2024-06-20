/**
 * Question Link: https://leetcode.com/problems/prefix-and-suffix-search/
 */

 class TrieNode {
    var children = [Character: TrieNode]()
    var isWord = false
    var index = 0
}

class Trie {
    let root = TrieNode()

    func insert(word: String, index: Int) {
        var cur = root
        for c in word {
            if cur.children[c] == nil {
                let node = TrieNode()
                node.index = index
                cur.children[c] = node
            }
            cur = cur.children[c]!
        }
        cur.isWord = true
    }

    func search(pref: String, suff: String) -> Int {
        var cur = root
        for c in suff + "#" + pref {
            if cur.children[c] == nil {
                return -1
            }
            cur = cur.children[c]!
        }
        return cur.index
    }
}

class WordFilter {
    let trie = Trie()

    init(_ words: [String]) {
        for i in stride(from: words.count - 1, to: -1, by: -1) {
            var prefix = [Character]()
            for c in words[i].reversed() {
                prefix.insert(c, at: 0)
                let newWord = String(prefix) + "#" + words[i]
                trie.insert(word: newWord, index: i)
            }
        }
    }
    
    func f(_ pref: String, _ suff: String) -> Int {
        trie.search(pref: pref, suff: suff)
    }
}

/**
 * Your WordFilter object will be instantiated and called as such:
 * let obj = WordFilter(words)
 * let ret_1: Int = obj.f(pref, suff)
 */