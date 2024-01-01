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

class Solution
{
public:
    int numSquares(int n)
    {
        // Create a vector to store all perfect squares
        vector<int> vectorOfPerfectSquare;

        // Loop through the numbers from 1 to the square root of n
        for (int i = 1; i * i <= n; i++)
        {
            // If the square of i is a perfect square, push it to the vector v
            vectorOfPerfectSquare.push_back(i * i);
        }

        // If n is equal to 1, return 1
        if (n == 1)
        {
            return 1;
        }

        // Define a variable Max equal to n + 1
        int Max = n + 1;
        // Create a vector dp with length equal to n + 1 and fill it with Max
        vector<int> dp(n + 1, Max);
        // Initialize the first element of dp as 0
        dp[0] = 0;
        // Loop through n from 1 to n
        for (int i = 1; i <= n; i++)
        {
            // Loop through the vectorOfPerfectSquare
            for (int j = 0; j < vectorOfPerfectSquare.size(); j++)
            {
                // If the value of i is greater than or equal to the current coin value
                if (i - vectorOfPerfectSquare[j] >= 0)
                {
                    // Update the value of dp[i] to the minimum of dp[i] and dp[i-vectorOfPerfectSquare[j]] + 1
                    dp[i] = min(dp[i], dp[i - vectorOfPerfectSquare[j]] + 1);
                }
            }
        }
        // Return the value of dp[n] if it is less than or equal to n, else return -1
        return dp[n] > n ? -1 : dp[n];
    }
};