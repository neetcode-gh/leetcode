/**
 * https://leetcode.com/problems/check-if-a-string-contains-all-binary-codes-of-size-k/
 * 
 * Hashing
 * Time O(n*k) | Space O(2^k) (it can't get any bigger than 2^k in the worst case)
 * @param {string} s
 * @param {number} k
 * @return {boolean}
 */
var hasAllCodes = function(s, k) {
    
    const bitSet = new Set();

    for(let i = 0; i < s.length; i++) {
        if(s.substring(i,i+k).length === k) {
            bitSet.add(s.substring(i,i + k));
        }
    }

    return bitSet.size === 1<<k;
};

