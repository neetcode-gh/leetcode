// Almost same solution as 438. Find All Anagrams in A String.
class Solution {
    public:
        bool checkInclusion(string s1, string s2) {
            if (s2.size() < s1.size()) {
                return false;
            }
            int left = 0;
            int right = s1.size() - 1;
            unordered_map<char, int> s1_count;
            unordered_map<char, int> s2_count;

            for (int i = 0; i < s1.size() - 1; ++i) {
                s1_count[s1[i]]++;
                s2_count[s2[i]]++;
            }
            s1_count[s1.back()]++;

            while (right < s2.size()) {
                s2_count[s2[right]]++;
                if (s1_count == s2_count) {
                    return true;
                }

                s2_count[s2[left]]--;
                if (s2_count[s2[left]] == 0) {
                    s2_count.erase(s2[left]);
                }
                ++right;
                ++left;
            }
            return false;
        }
};
