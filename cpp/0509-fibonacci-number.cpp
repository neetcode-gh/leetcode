/*
  The Fibonacci numbers, commonly denoted F(n) form a sequence, called the Fibonacci sequence, such that each number is the sum of the two preceding ones, starting from 0 and 1. That is,
  F(0) = 0, F(1) = 1
  F(n) = F(n - 1) + F(n - 2), for n > 1.
  Given n, calculate F(n).

  Ex. Input: n = 2
      Output: 1
      Explanation: F(2) = F(1) + F(0) = 1 + 0 = 1.
      
  Time  : O(N)
  Space : O(N)
*/

/*
  Recursive solution : 
  Time : O(2^N), Space : O(n)
  class Solution {
  public:
      int fib(int n) {
          if(n < 2)
              return n;
          return fib(n-1) + fib(n-2);
      }
  };

*/

class Solution {
public:
    int fib(int n) {
        if(n < 2)
            return n;
        vector <int> v(n+1, 0);
        v[1] = 1;
        for(int i = 2 ; i <= n ; i++) {
            v[i] = v[i-1] + v[i-2];
        }
        return v[n];
    }
};
