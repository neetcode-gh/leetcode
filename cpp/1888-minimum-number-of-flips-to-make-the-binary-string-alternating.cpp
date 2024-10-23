// O(n) time and O(n) space complexity
// Use a sliding window to update the number of differences between current string and two target strings
// Instead of doing the type-1 operation N times, we can append a copy of the string to the end of the string, and iterate with a sliding window.
// As you iterate through the window, update the count of differences
// If the sliding window is the full size, update the result with the minimum of the two counts of differences
class Solution {
public:
    int minFlips(string s) {
       int n =  s.size();
       s = s.append(s);
       string t1 = "";
       string t2 = "";
       for (int i = 0; i < s.size(); i++){
           if (i % 2 == 0) {
               t1.append("0");
               t2.append("1");
           } else {
               t1.append("1");
               t2.append("0");
           }
       }
       int res = INT_MAX;
       int diff1 = 0;
       int diff2 = 0;
       int l = 0;
       for (int r = 0; r < s.size(); r++){
           if (s[r] != t1[r]) {
               diff1++;
           }
           if (s[r] != t2[r]) {
               diff2++;
           }
           if ((r - l + 1) > n) {
               if (s[l] != t1[l]) {
                   diff1--;
               }
               if (s[l] != t2[l]) {
                   diff2--;
               }
               l++;
           }
           if (r - l + 1 == n) {
               int temp = min(res, diff1);
               res = min(temp, diff2);
           }
       }
       return res;
    }
};
