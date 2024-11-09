#include <iostream>
#include <vector>
using namespace std;

/*
    problem link: https://leetcode.com/problems/perfect-squares/description/
    Given an integer n, return the least number of perfect square numbers that sum to n.

    A perfect square is an integer that is the square of an integer; in other words, it is the
    product of some integer with itself. For example, 1, 4, 9, and 16 are perfect squares while 3
    and 11 are not.

    Example 1:

    Input: n = 12
    Output: 3
    Explanation: 12 = 4 + 4 + 4.

    Example 2:

    Input: n = 13
    Output: 2
    Explanation: 13 = 4 + 9.
*/

class Solution {
public:
    // Similar to Coin Change problem
    int numSquares(int n) {
        // Create the dp array to eliminate the cache
        vector<int> dp(n + 1);
        // Initialize the firest element of dp as 0
        dp[0] = 0;
        for (int i = 1; i <= n; i++)
        {
            // Biggest is when all square is 1^2 that is when dp[i] = i
            dp[i] = i;
            for (int j = 1; j * j <= i; j++) {
                // Update the value of dp[i]
                dp[i] = min(dp[i], dp[i - j * j] + 1);
            }
        }
        // Return the value of dp[n]
        return dp[n];
    }
};
