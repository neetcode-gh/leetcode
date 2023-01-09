class Solution {
  bool isSubsequence(String s, String t) {
      int i = 0, j = 0;
      while (i < t.length && j != s.length) {
          if (t[i] == s[j]) {
              j += 1;
          }
          i += 1;
      }
      return j == s.length;
  }
}