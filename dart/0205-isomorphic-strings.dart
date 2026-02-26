// Time Complexity: O(n)
// Space Complexity: O(1)

class Solution {
  bool isIsomorphic(String s, String t) {
    if (s.length != t.length) return false;

    Map<String, String> sToT = {};
    Map<String, String> tToS = {};

    for (int i = 0; i < s.length; i++) {
      String currS = s[i]; 
      String currT = t[i];

      if (sToT.containsKey(currS) && sToT[currS] != currT) {
        return false;
      }

      if (tToS.containsKey(currT) && tToS[currT] != currS) {
        return false;
      }

      sToT[currS] = currT;
      tToS[currT] = currS;
    }

    return true;
  }
}
