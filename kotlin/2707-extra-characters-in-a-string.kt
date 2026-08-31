class Solution {

    private lateinit var memo: IntArray

    private class TrieNode {
        val children = HashMap<Char, TrieNode>()
        var isWord = false
    }

    fun minExtraChar(s: String, dictionary: Array<String>): Int {
        val root = buildTrie(dictionary)
        memo = IntArray(s.length) { -1 }
        return dfs(0, s, root)
    }

    private fun dfs(index: Int, s: String, root: TrieNode): Int {
        if (index == s.length) return 0
        if (memo[index] != -1) return memo[index]

        var result = 1 + dfs(index + 1, s, root)

        var node = root
        for (i in index until s.length) {
            node = node.children[s[i]] ?: break
            if (node.isWord) {
                result = minOf(result, dfs(i + 1, s, root))
            }
        }

        memo[index] = result
        return result
    }

    private fun buildTrie(dictionary: Array<String>): TrieNode {
        val root = TrieNode()

        for (word in dictionary) {
            var node = root
            for (ch in word) {
                node = node.children.getOrPut(ch) { TrieNode() }
            }
            node.isWord = true
        }

        return root
    }
}
