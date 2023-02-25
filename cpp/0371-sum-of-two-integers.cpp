/*
    Given 2 ints, return sum w/o using +/-
    Ex. a = 1 b = 2 -> 3, a = 2 b = 3 -> 5

    XOR for addition, AND for carry bit

    Time: O(n)
    Space: O(1)
*/

class Solution {
public:
    int getSum(int a, int b) {
        while (b != 0) {
            int carry = a & b;
            a = a ^ b;
            b = (unsigned)carry << 1;
        }
        return a;
    }
};
