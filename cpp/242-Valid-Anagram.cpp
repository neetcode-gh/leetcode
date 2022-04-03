/*
	  Time Complexity: O(N)
	  Space Complexity: O(N)
*/

class Solution {
 public:
  bool isAnagram(string s, string t) {
    if (s.length() != t.length()) {
      return false;
    }
    unordered_map<char, int> um;
    for (int i = 0; i < s.length(); i++) um[s.at(i)]++;
    for (int i = 0; i < t.length(); i++) {
      um[t.at(i)]--;
      if (um[t.at(i)] < 0) return false;
    }

    return true;
  }
};
