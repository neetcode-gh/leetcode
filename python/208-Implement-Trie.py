class Trie:

    def __init__(self):
        """
        Initialize your data structure here.
        """
        self.root = {}

    def insert(self, word: str) -> None:
        """
        Inserts a word into the trie.
        """
        curr_node = self.root
        
        for char in word:
            if char not in curr_node :
                curr_node[char] = {}
            curr_node = curr_node[char]
            
        curr_node['end'] = True
            
    def search(self, word: str) -> bool:
        """
        Returns if the word is in the trie.
        """
        curr_node = self.root
        
        for char in word:
            if char not in curr_node:
                return False
            curr_node = curr_node[char]
        
        return 'end' in curr_node

    def startsWith(self, prefix: str) -> bool:
        """
        Returns if there is any word in the trie that starts with the given prefix.
        """
        curr_node = self.root
        
        for char in prefix:
            if char not in curr_node:
                return False
            curr_node = curr_node[char]
        
        return True
    

