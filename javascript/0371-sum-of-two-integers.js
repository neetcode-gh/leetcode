/**
 * https://leetcode.com/problems/sum-of-two-integers/
 * Time O(1) | Space O(1)
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
 var getSum = function(a, b) {
    while (b !== 0) {
        const [ xor, carry ] = [ (a ^ b), ((a & b) << 1) ];

        a = xor;
        b = carry;
    }
    
    return a
};