/*
    Given large int as an array, add 1 (consider carry)
    Ex. digits = [1,2,3] -> [1,2,4]

    From right to left, keep carrying until digit < 9, add 1

    Time: O(n)
    Space: O(1)
*/

class Solution {
public:
    vector<int> plusOne(vector<int>& digits) {
        for (int i = digits.size() - 1; i >= 0; i--) {
            if (digits[i] < 9) {
                digits[i]++;
                return digits;
            }
            digits[i] = 0;
        }
        
        digits[0] = 1;
        digits.push_back(0);
        return digits;
    }
};
