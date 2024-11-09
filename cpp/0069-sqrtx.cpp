/*
  Given a non-negative integer x, return the square root of x rounded down to the nearest integer. The returned integer should be non-negative as well.
  You must not use any built-in exponent function or operator.

  For example, do not use pow(x, 0.5) in c++ or x ** 0.5 in python.

  Ex. Input: x = 4
      Output: 2
      Explanation: The square root of 4 is 2, so we return 2.

  Time  : O(log N)
  Space : O(1)
*/

class Solution {
public:
    int mySqrt(int x) {
        if(x == 0 || x == 1)
            return x;
            
        long long beg = 0, mid = 0, end = x/2;
        while(beg <= end) {
            mid = (beg + end)/2;
            if(mid * mid < x) {
                if((mid + 1) * (mid + 1) > x)
                    return mid;
                beg = mid+1;
            } else if(mid * mid > x) {
                if( (mid - 1) * (mid - 1) < x)
                    return mid-1;
                end = mid - 1;
            } else 
                return mid;
        }
        return mid;
    }
};
