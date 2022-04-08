struct TrieNode {
	TrieNode* children[26];
	bool isWordEnd;

	TrieNode() : isWordEnd(false) {
		for (int i = 0; i < 26; ++i)
			children[i] = nullptr;
	}
};

class Trie {
private:
	TrieNode* root;
public:
	Trie() {
		root = new TrieNode;
	}

	void insert(string word) {
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

	bool search(string word) {
		TrieNode* cur = root;

		int idx;
		for (int i = 0; i < word.size(); ++i) {
			idx = word[i] - 'a';
			if (cur->children[idx] == nullptr)
				return false;
			cur = cur->children[idx];
		}
		// check if the node is end of any word
		return cur->isWordEnd;
	}

	bool startsWith(string prefix) {
		TrieNode* cur = root;

		int idx;
		for (int i = 0; i < prefix.size(); ++i) {
			idx = prefix[i] - 'a';
			if (cur->children[idx] == nullptr)
				return false;
			cur = cur->children[idx];
		}
		// only need to check if the node exists
		return true;
	}
};
