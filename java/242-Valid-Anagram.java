class Solution {

  public boolean isAnagram(String s, String t) {
    if (s.length() != t.length()) return false;

    int[] store = new int[26];

    for (int i = 0; i < s.length(); i++) {
      store[s.charAt(i) - 'a']++;
      store[t.charAt(i) - 'a']--;
    }

    for (int n : store) if (n != 0) return false;

    return true;
  }
}
