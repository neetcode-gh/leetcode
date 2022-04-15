class Solution {
public:
    int minDistance(string word1, string word2) {
        // cache for edit distance between substrings or word1 and word2 containing 0 letter to full word
        vector<vector<int>> cache(word1.size() + 1, vector<int>(word2.size() + 1));

        // if one word is empty, edit distance is adding all letters of the other word
        for (int i = 0; i <= word1.size(); ++i)
            cache[i][0] = i;
        for (int j = 0; j <= word2.size(); ++j)
            cache[0][j] = j;

        for (int i = 1; i <= word1.size(); ++i) {
            for (int j = 1; j <= word2.size(); ++j) {
                if (word1[i - 1] == word2[j - 1]) // if current letters are the same, edit distance is same as before
                    cache[i][j] = cache[i - 1][j - 1];
                else // else the distance is min of (replace, add, delete) 
                    cache[i][j] = min(cache[i - 1][j - 1], min(cache[i - 1][j], cache[i][j - 1])) + 1;
            }
        }
        return cache[word1.size()][word2.size()];
    }
};
