class Solution {
  int lengthOfLastWord(String s) {
      final words = s.trim().split(" ");
      return words[words.length - 1].length;
  }
}