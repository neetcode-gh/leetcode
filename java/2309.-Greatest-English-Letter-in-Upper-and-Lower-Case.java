//Contest 298 brute-force feel free to share any improvements
class Solution {

  public String greatestLetter(String s) {
    HashSet<Integer> set = new HashSet<>();
    int ans = -1;
    for (int i = 0; i < s.length(); i++) {
      if (
        set.contains((s.charAt(i) - 32)) || set.contains((s.charAt(i) + 32))
      ) ans = Math.max(ans, (int) Character.toUpperCase(s.charAt(i)));
      set.add(0 + s.charAt(i));
    }
    return ans == -1 ? "" : (char) ans + "";
  }
}
