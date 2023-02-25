// Time Complexity: O(n)
// Space Complexity: O(1)

class Solution {
  static bool isAlphaNum(String s) {
    if ((s.codeUnits[0] >= 'a'.codeUnitAt(0) &&
            s.codeUnits[0] <= 'z'.codeUnitAt(0)) ||
        (s.codeUnits[0] >= 'A'.codeUnitAt(0) &&
            s.codeUnits[0] <= 'Z'.codeUnitAt(0)) ||
        (s.codeUnits[0] >= '0'.codeUnitAt(0) &&
            s.codeUnits[0] <= '9'.codeUnitAt(0))) {
      return true;
    }
    return false;
  }

  bool isPalindrome(String s) {
    var left = 0, right = s.length - 1;

    while (left < right) {
      while (!Solution.isAlphaNum(s[left]) && left < right) left++;
      while (!Solution.isAlphaNum(s[right]) && left < right) right--;

      if (s[left].toLowerCase() != s[right].toLowerCase()) return false;

      left++;
      right--;
    }

    return true;
  }
}
