/**
 * Sliding Window | Counting
 * Time O(n) | Space O(1)
 * https://leetcode.com/problems/number-of-sub-arrays-with-odd-sum
 * @param {number[]} arr
 * @return {number}
 */
var numOfSubarrays = function(arr) {
    
    let odds = 0;
    let evens = 0;
    let total = 0;
    let currTotal = 0;
    const mod = 10**9 + 7;

    for (const num of arr) {
        currTotal += num;

        // if odd
        if (currTotal%2) {
            odds++;
            total = (total + 1 + evens) % mod;
        }

        // if even
        if (!(currTotal%2)) {
            evens++;
            total = (total + odds) % mod;
        }
    }

    return total%mod;
};
