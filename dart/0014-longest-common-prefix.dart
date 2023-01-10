class Solution {
  String longestCommonPrefix(List<String> strs) {
      String res = "";
      for (int i=0; i<strs[0].length; i++) {
          for (String s in strs) {
              if (i >= s.length || strs[0][i] != s[i]){
                  return res;
              }
          }
          res += strs[0][i];
      }
      return res;
  }
}