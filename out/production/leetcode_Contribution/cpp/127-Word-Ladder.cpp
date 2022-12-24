/*
    Given 2 words & a dictionary, return min # of words to transform b/w them
    Ex. begin = "hit", end = "cog", dict = ["hot","dot","dog","lot","log","cog"] -> 5
    "hit" -> "hot" -> "dot" -> "dog" -> "cog"

    BFS, change 1 letter at a time (neighbors), if in dict add to queue, else skip

    Time: O(m^2 x n) -> m = length of each word, n = # of words in input word list
    Space: O(m^2 x n)
*/

class Solution {
public:
    int ladderLength(string beginWord, string endWord, vector<string>& wordList) {
        unordered_set<string> dict;
        for (int i = 0; i < wordList.size(); i++) {
            dict.insert(wordList[i]);
        }
        
        queue<string> q;
        q.push(beginWord);
        
        int result = 1;
        
        while (!q.empty()) {
            int count = q.size();
            
            for (int i = 0; i < count; i++) {
                string word = q.front();
                q.pop();
                
                if (word == endWord) {
                    return result;
                }
                dict.erase(word);
                
                for (int j = 0; j < word.size(); j++) {
                    char c = word[j];
                    for (int k = 0; k < 26; k++) {
                        word[j] = k + 'a';
                        if (dict.find(word) != dict.end()) {
                            q.push(word);
                            dict.erase(word);
                        }
                        word[j] = c;
                    }
                }
            }
            
            result++;
        }
        
        return 0;
    }
};
