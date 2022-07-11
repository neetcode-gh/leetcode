//Intuitive approach

class Solution {

  public int countCharacters(String[] words, String chars) {
    int[] arrChars = new int[26];
    for (int i = 0; i < chars.length(); i++) {
      arrChars[chars.charAt(i) - 'a']++;
    }
    int ans = 0;
    for (String s : words) {
      boolean flag = true;
      int[] arrS = new int[26];
      for (int i = 0; i < s.length(); i++) {
        arrS[s.charAt(i) - 'a']++;
      }
      for (int i = 0; i < 26; i++) {
        if (arrS[i] > arrChars[i]) flag = false;
      }
      if (flag) ans += s.length();
    }
    return ans;
  }
}
