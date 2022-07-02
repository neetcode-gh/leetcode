/*
    Given a signed 32-bit integer, return it with its digits reversed
    Ex. x = 123 -> 321, x = -123 -> -321, x = 120 -> 21

    Reverse bit-by-bit starting from right, shift right off every time

    Time: O(log x)
    Space: O(1)
*/

class Solution {
public:
    int reverse(int x) {
        int rev = 0;
        while (x != 0) {
            int temp = x % 10;
            x /= 10;
            if (rev > INT_MAX / 10 || (rev == INT_MAX / 10 && temp > 7)) {
                return 0;
            }
            if (rev < INT_MIN / 10 || (rev == INT_MIN / 10 && temp < -8)) {
                return 0;
            }
            rev = rev * 10 + temp;
        }
        return rev;
    }
};
