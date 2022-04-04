class Solution {
public:
    bool isAnagram(string s, string t) {
        vector<int> count(26, 0);
        for (auto a: s) count[a-'a']++;
        for (auto a: t) count[a-'a']--;
        for (auto c: count) if(c) return false;
        return true;
    }
};