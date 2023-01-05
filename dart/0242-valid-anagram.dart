// Time Complexity: O(s + t)
// Space Complexity: O(1)

class Solution {
  bool isAnagram(String s, String t) {
    if (s.length != t.length) return false;

    final counter = List.filled(26, 0);

    for (int i = 0; i < s.length; i++) {
      counter[s[i].codeUnitAt(0) - 'a'.codeUnitAt(0)]++;
    }

    for (int i = 0; i < t.length; i++) {
      counter[t[i].codeUnitAt(0) - 'a'.codeUnitAt(0)]--;
    }

    for (int val in counter) {
      if (val != 0) return false;
    }

    return true;
  }
}