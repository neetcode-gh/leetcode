struct TrieNode {
	TrieNode* children[26];
	bool isWordEnd;

	TrieNode() : isWordEnd(false) {
		for (int i = 0; i < 26; ++i)
			children[i] = nullptr;
	}
};

class WordDictionary {
private:
	TrieNode* root;
public:
	WordDictionary() {
		root = new TrieNode;
	}

	void addWord(string word) {
		// simple trie insertion
		TrieNode* cur = root;

		int idx;
		for (int i = 0; i < word.size(); ++i) {
			idx = word[i] - 'a';
			if (cur->children[idx] == nullptr)
				cur->children[idx] = new TrieNode;
			cur = cur->children[idx];
		}
		// mark the last node as end of a word
		cur->isWordEnd = true;
	}

	bool recursiveSearch(const string &word, int curIdx, const TrieNode *node) {
		auto cur = node;

		for (int i = curIdx; i < word.size(); ++i) {
			if (word[i] == '.') {
				// can match any character - backtracking is required
				for (int j = 0; j < 26; ++j) {
					if (cur->children[j] == nullptr) // skip non-existing characters
						continue;
					if (recursiveSearch(word, i + 1, cur->children[j])) // try and backtrack if fails
						return true;
				}
				// search with backtracking failed in all children
				return false;
			}
			else {
				// simple trie search
				int idx = word[i] - 'a';
				if (cur->children[idx] == nullptr)
					return false;
				cur = cur->children[idx];
			}
		}
		// check if the node is end of any word
		return cur->isWordEnd;
	}

	bool search(string word) {
		return recursiveSearch(word, 0, root);
	}
};
