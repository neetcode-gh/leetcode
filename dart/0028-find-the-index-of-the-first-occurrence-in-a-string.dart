class Solution {
  int strStr(String haystack, String needle) {
    var result = haystack.replaceAll(needle, '0').indexOf('0');
    return result;
  }
}