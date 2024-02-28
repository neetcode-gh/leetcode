/*
    Return number of '1' bits in an int
    Ex. n = 00001011 -> 3

    Simply count bit-by-bit & shift it off

    Time: O(1)
    Space: O(1)
*/

class Solution {
public:
    int hammingWeight(uint32_t n) {
        int bit = 0;
        int result = 0;
        
        while (n != 0) {
            bit = n & 1;
            if (bit == 1) {
                result++;
            }
            n = n >> 1;
        }
        
        return result;
    }
};


/* use kernighan's algorithm to only iterate num(set bits) times */
class Solution {
public:
    int hammingWeight(uint32_t n) {
        unsigned int count = 0;

        while(n) {
            ++count;
            // unset rightmost set bit
            n = (n & (n - 1));
        }
        
        return count;
    }
};