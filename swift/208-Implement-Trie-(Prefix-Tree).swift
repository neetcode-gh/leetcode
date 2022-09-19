class TrieNode {
    var children: [Character: TrieNode]
    var isWord: Bool
    
    init() {
        children = [:]
        isWord = false
    }
}

class Trie {
    var head: TrieNode
    
    init() {
        head = TrieNode()
    }
    
    func insert(_ word: String) {
        var itr = head
        for char in word {
            guard let child = itr.children[char] 
            else {               
                let newNode = TrieNode()
                itr.children[char] = newNode
                itr = newNode
                continue
            }
            itr = child
        }
        itr.isWord = true
    }
    
    // Helper function to combine word and prefix searching
    private func search(word: String, isPrefixCheck: Bool) -> Bool {
        var itr = head
        for char in word {
            guard let child = itr.children[char] else { return false }
            itr = child
        }
        return isPrefixCheck ? true : itr.isWord
    }
    
    func search(_ word: String) -> Bool {
        search(word: word, isPrefixCheck: false)
    }
    
    func startsWith(_ prefix: String) -> Bool {
        search(word: prefix, isPrefixCheck: true)
    }
}

/**
 * Your Trie object will be instantiated and called as such:
 * let obj = Trie()
 * obj.insert(word)
 * let ret_2: Bool = obj.search(word)
 * let ret_3: Bool = obj.startsWith(prefix)
 */