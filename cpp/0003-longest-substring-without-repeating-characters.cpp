/*
    Given string, find longest substring w/o repeating chars
    Ex. s = "abcabcbb" -> 3 "abc", s = "bbbbb" -> 1 "b"

    Sliding window, expand if unique, contract if duplicate

    Time: O(n)
    Space: O(n)
*/
/*
class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        unordered_set<char> letters;
        
        int i = 0;
        int j = 0;
        
        int result = 0;
        
        while (j < s.size()) {
            if (letters.find(s[j]) == letters.end()) {
                letters.insert(s[j]);
                result = max(result, j - i + 1);
                j++;
            } else {
                letters.erase(s[i]);
                i++;
            }
        }
        
        return result;
    }
};
*/
// Same solution as above with the same amount of total iterations.
// Above solution: no inner loop, but the "j" variable is not increased at each iteration
// Below: inner loop increasing "i", outer loop increasing "j".
class Solution {
public:
    int lengthOfLongestSubstring(string& s) {
        unordered_set<char> chars;
        int maxSize = 0;
        int i = 0, j = 0;
        while (j < s.size()){
            while (chars.find(s[j]) != chars.end()){
                chars.erase(s[i]);
                ++i;
            }
            maxSize = max(maxSize, j - i + 1);
            chars.insert(s[j]);
            ++j;
        }
        return maxSize;
    }
};
