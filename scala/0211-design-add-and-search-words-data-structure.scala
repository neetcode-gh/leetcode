import scala.collection.mutable.HashMap

class WordDictionary() {
    val trie = new Trie()

    def addWord(word: String) {
        trie.insert(word) 
    }

    def search(word: String): Boolean = {
        trie.search(word)
    }

}

class Trie() {
    class TrieNode {
        val children: HashMap[Char, TrieNode] = HashMap()
        var isEndOfWord = false
    }

    private var root: TrieNode = new TrieNode()

    def insert(word: String): Unit = {
        var curr = root
        word.foreach(c => {
            if (!curr.children.contains(c)) {
                curr.children(c) = new TrieNode()                
            }

            curr = curr.children(c)
        })

        curr.isEndOfWord = true
    }

    def search(word: String): Boolean = {
        def helper(currNode: TrieNode, currCharIndex: Int): Boolean = {
            if (currCharIndex == word.length) {
                return currNode.isEndOfWord
            }

            val currChar = word(currCharIndex)
            if (currChar == '.') {
                var isFound = false 

                for ((_, childNode) <- currNode.children if !isFound) {
                    isFound = helper(childNode, currCharIndex + 1)
                }

                return isFound 
            } else {
                if (currNode.children.contains(currChar)) {
                    return helper(currNode.children(currChar), currCharIndex + 1) 
                } else {
                    return false 
                }
            }
        } 

        helper(root, 0)
    }
}

/**
 * Your WordDictionary object will be instantiated and called as such:
 * var obj = new WordDictionary()
 * obj.addWord(word)
 * var param_2 = obj.search(word)
 */