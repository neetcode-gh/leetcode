class WordDictionary() {
    data class TrieNode(var isLeaf: Boolean = false, val children: MutableMap<Char, TrieNode> = mutableMapOf())

    val root = TrieNode()

    fun addWord(word: String) {
        var current = root
        for (c in word) {
            current = current.children.getOrPut(c) { TrieNode() }
        }
        current.isLeaf = true
    }

    fun search(word: String): Boolean {
        var candidates = listOf(root)
        for (c in word) {
            candidates = when (c) {
                '.' -> candidates.flatMap { it.children.values }
                else -> candidates.mapNotNull { it.children[c] }
            }
            if (candidates.isEmpty()) return false
        }
        return candidates.any { it.isLeaf }
    }
}