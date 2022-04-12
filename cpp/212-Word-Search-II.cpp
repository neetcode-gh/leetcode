struct TrieNode {
	TrieNode* children[26];
	int wordEndCnt;
	string word;

	TrieNode() : wordEndCnt(0), word("") {
		for (int i = 0; i < 26; ++i)
			children[i] = nullptr;
	}
};

class Solution {
public:
	void addWord(TrieNode* node, const string& word) {
		// simple trie insertion
		TrieNode* cur = node;

		int idx;
		for (int i = 0; i < word.size(); ++i) {
			idx = word[i] - 'a';
			if (cur->children[idx] == nullptr)
				cur->children[idx] = new TrieNode;
			cur = cur->children[idx];
		}
		// increase the word end counter
		++cur->wordEndCnt;
		cur->word = word;
	}

	void solve(vector<vector<char>>& board, int ROWS, int COLS, int r, int c, vector<string>& result, TrieNode* cur) {
		// boundary check
		if (r < 0 || r >= ROWS || c < 0 || c >= COLS)
			return;
		// visit check
		if (board[r][c] == '$')
			return;
		// existence check 
		int idx = board[r][c] - 'a';
		if (cur->children[idx] == nullptr)
			return;
		cur = cur->children[idx];
		if (cur->wordEndCnt > 0) {
			// found word
			result.push_back(cur->word);
			--cur->wordEndCnt;
		}

		// mark as visited and backtrack
		char origin = board[r][c];
		board[r][c] = '$';
		solve(board, ROWS, COLS, r + 1, c, result, cur);
		solve(board, ROWS, COLS, r - 1, c, result, cur);
		solve(board, ROWS, COLS, r, c + 1, result, cur);
		solve(board, ROWS, COLS, r, c - 1, result, cur);
		board[r][c] = origin;
	}

	vector<string> findWords(vector<vector<char>>& board, vector<string>& words) {
		TrieNode* root = new TrieNode;
		for (auto w : words) {
			addWord(root, w);
		}
		int ROWS = board.size(), COLS = board[0].size();

		vector<string> result;
		// check every cells
		for (int i = 0; i < ROWS; ++i)
			for (int j = 0; j < COLS; ++j)
				solve(board, ROWS, COLS, i, j, result, root);
		return result;
	}
};
