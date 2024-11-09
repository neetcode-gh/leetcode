class TrieNode:
    def __init__(self):
        self.children = {}  # Dictionary to store child nodes
        self.word = -1  # Store the index of the word at this node


class WordFilter:
    def __init__(self, words: List[str]):
        # Initialize root of the Trie
        self.root = TrieNode()

        # For each word, we create combined prefix-suffix keys
        for index, word in enumerate(words):
            # Insert all combinations of the form prefix{suffix into the Trie
            for i in range(len(word) + 1):
                for j in range(len(word) + 1):
                    # Create the key as suffix + '{' + prefix
                    key = word[i:] + '{' + word[:j]
                    cur = self.root
                    for c in key:
                        if c not in cur.children:
                            cur.children[c] = TrieNode()
                        cur = cur.children[c]
                    cur.word = index  # Store the index of the word at this node

    def f(self, pref: str, suff: str) -> int:
        # Combine suffix and prefix to search in Trie
        key = suff + '{' + pref
        cur = self.root
        for c in key:
            if c not in cur.children:
                return -1  # If combination doesn't exist, return -1
            cur = cur.children[c]
        return cur.word  # Return the largest index found for the valid combination


# Your WordFilter object will be instantiated and called as such:
# obj = WordFilter(words)
# param_1 = obj.f(pref,suff)
