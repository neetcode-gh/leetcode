/**
 * Sliding Window
 * Time O(n) | Space O(1)
 * https://leetcode.com/problems/get-equal-substrings-within-budget/
 * @param {string} s
 * @param {string} t
 * @param {number} maxCost
 * @return {number}
 */
var equalSubstring = function(s, t, maxCost) {

    let currCost = 0;
    let left = 0;
    let right = 0;
    let currLen = 0;
    let maxLen = 0;

    while (right < t.length) {

        if (s[right] === t[right]) {
            currLen = right-left+1;
            maxLen = Math.max(maxLen, currLen);
            right++;
            continue;
        }

        currCost += Math.abs(s[right].charCodeAt(0) - t[right].charCodeAt(0));

        while (left < right && currCost > maxCost) {
            currCost -= Math.abs(s[left].charCodeAt(0) - t[left].charCodeAt(0));
            left++;
        }
        
        if (currCost <= maxCost) {
            currLen = right-left+1;
            maxLen = Math.max(maxLen, currLen);
        }
        
        right++;
    }

    return maxLen;
};
