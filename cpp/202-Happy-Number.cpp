/*
	  Time Complexity: O(log n)
	  Space Complexity: O(log n)
*/

class Solution {
public:
  bool isHappy(int n) {
    unordered_set<int> us;
    while (us.find(n) == us.end()) {
      us.insert(n);
      int temp = 0;
      while (n > 0) {
        int digit = n % 10;
        digit = digit * digit;
        temp += digit;
        n = n / 10;
      }
      n = temp;
      if (n == 1) {
        return true;
      }
    }
    return false;
  }
};