/*
    Given 2 words & a dictionary, return min # of words to transform b/w them
    Ex. begin = "hit", end = "cog", dict = ["hot","dot","dog","lot","log","cog"] -> 5
    "hit" -> "hot" -> "dot" <- "dog" <- "cog"

    BFS, change 1 letter at a time (neighbors), if in dict add to queue, else skip

    Time: O(n x 26^(l/2)) -> l = length of each word, n = # of words in input word list
    Space: O(n)
*/

#include <vector>
#include <string>
#include <unordered_set>

using namespace std;

class Solution {
public:
    int ladderLength(string beginWord, string endWord, vector<string>& wordList) {
        unordered_set<string> wordSet(wordList.begin(), wordList.end());
        // edge case
        if (wordSet.find(endWord) == wordSet.end()) {
            return 0;
        }
        
        unordered_set<string> q1;
        unordered_set<string> q2;
        q1.insert(beginWord);
        q2.insert(endWord);
        
        int step{0};
        while (!q1.empty() && !q2.empty()) {
            step++;
            // expand the smaller set;
            if (q1.size() > q2.size()) {
                swap(q1, q2);
            }
            unordered_set<string> q;
            for (string word : q1) {
                for (int i{0}; i < beginWord.size(); i++) {
                    char ch = word[i];
                    for (char j{'a'}; j <= 'z'; j++) {
                        word[i] = j;
                        // meet at middle -> success
                        if (q2.find(word) != q2.end()) {
                            return step + 1;
                        }
                        // skip the word if not in wordList
                        if (wordSet.find(word) == wordSet.end()) {
                            continue;
                        }
                        // remove new word from set
                        wordSet.erase(word);
                        q.insert(word);
                    }
                    word[i] = ch;
                }
            }
            swap(q, q1);
        }
        return 0;
    }
};
