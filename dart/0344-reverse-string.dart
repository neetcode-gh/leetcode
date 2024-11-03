// Time Complexity: O(n)
// Space Complexity: O(1)

class Solution {
  void reverseString(List<String> s) {
    var l = 0, r = s.length - 1;
    while (l <= r) {
      var tmp = s[l]; 
      s[l] = s[r]; 
      s[r] = tmp;
      l += 1; 
      r -= 1;
    }
  }
}
