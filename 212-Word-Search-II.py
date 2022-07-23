class TrieNode:
    def __init__(self):
        self.children = {}
        self.isWord = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def addWord(self, word):
        current = self.root
        for c in word:
            if c not in current.children:
                current.children[c] = TrieNode()
            current = current.children[c]
        current.isWord = True

    def removeWord(self, word):
        node = self.root
        path = [(None, node)]
        for char in word:
            node = node.children[char]
            path.append((char, node))
        node.isWord = False

        for i in range(len(path) - 1, 0, -1):
            char, currNode = path[i][0], path[i][1]
            parentNode = path[i - 1][1]
            if currNode.isWord or currNode.children:
                break
            del parentNode.children[char]

class Solution:
    def findWords(self, board: List[List[str]], words: List[str]) -> List[str]:
        trie = Trie()

        # Converting words list to a trie
        for word in words:
            trie.addWord(word)

        rows, columns = len(board), len(board[0])
        result, visit = set(), set()

        def dfs(r, c, node, word):
            if (r < 0 or c < 0 or
                    r == rows or c == columns or
                    board[r][c] not in node.children or (r, c) in visit):
                return

            visit.add((r, c))
            node = node.children[board[r][c]]
            word += board[r][c]
            if node.isWord:
                result.add(word)
                trie.removeWord(word)

            dfs(r + 1, c, node, word)
            dfs(r - 1, c, node, word)
            dfs(r, c + 1, node, word)
            dfs(r, c - 1, node, word)
            visit.remove((r, c))

        for r in range(rows):
            for c in range(columns):
                dfs(r, c, trie.root, "")
        return list(result)
