/**
 * Bit-manupilation
 * Time O(n) |  Space O(1)
 * https://leetcode.com/problems/neighboring-bitwise-xor/
 * @param {number[]} derived
 * @return {boolean}
 */
var doesValidArrayExist = function(derived) {
    return derived.reduce((acc, bit) => acc^bit, 0) === 0;
};
