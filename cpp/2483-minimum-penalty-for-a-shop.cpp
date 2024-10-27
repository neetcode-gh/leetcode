/*
  You are given the customer visit log of a shop represented by a 0-indexed string customers consisting only of characters 'N' and 'Y':
      if the ith character is 'Y', it means that customers come at the ith hour
      whereas 'N' indicates that no customers come at the ith hour.
      
  If the shop closes at the jth hour (0 <= j <= n), the penalty is calculated as follows:
      For every hour when the shop is open and no customers come, the penalty increases by 1.
      For every hour when the shop is closed and customers come, the penalty increases by 1.
      
  Return the earliest hour at which the shop must be closed to incur a minimum penalty.
  Note that if a shop closes at the jth hour, it means the shop is closed at the hour j.

  Ex. Input: customers = "YYNY"
      Output: 2
      Explanation: 
      - Closing the shop at the 0th hour incurs in 1+1+0+1 = 3 penalty.
      - Closing the shop at the 1st hour incurs in 0+1+0+1 = 2 penalty.
      - Closing the shop at the 2nd hour incurs in 0+0+0+1 = 1 penalty.
      - Closing the shop at the 3rd hour incurs in 0+0+1+1 = 2 penalty.
      - Closing the shop at the 4th hour incurs in 0+0+1+0 = 1 penalty.
      Closing the shop at 2nd or 4th hour gives a minimum penalty. Since 2 is earlier, the optimal closing time is 2.

  Time  : O(N)
  Space : O(1)
*/

class Solution {
public:
    int bestClosingTime(string customers) {
        int res = -1, maxi = 0, pen = 0;
        for(int i = 0 ; i < customers.size() ; ++i) {
            if(customers[i] == 'Y')
                ++pen;
            else 
                --pen;
            if(pen > maxi) {
                maxi = pen;
                res = i;
            }
        }
        return ++res;
    }
};
