class Trie() {
    private class Node {
        val nxt = Array(26) { null as Node? }
        var end = false
    }
    
    private val root = Node()

    fun insert(word: String) {
        var cur = root
        for (c in word) {
            cur = cur.nxt[c - 'a'] ?: Node().also { cur.nxt[c - 'a'] = it }
        }
        cur.end = true
    }

    fun search(word: String): Boolean = internalSearch(word, prefix = false)

    fun startsWith(prefix: String): Boolean = internalSearch(prefix, prefix = true)
    
    private fun internalSearch(word: String, prefix: Boolean): Boolean {
        var cur = root
        for (c in word) {
            cur = cur.nxt[c - 'a'] ?: return false
        }
        return cur.end || prefix
    }
}
/**
 * Your Trie object will be instantiated and called as such:
 * var obj = Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */