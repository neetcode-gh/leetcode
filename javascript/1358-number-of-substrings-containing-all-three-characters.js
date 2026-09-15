/**
 * Sliding Window
 * Time O(n) | Space O(1)
 * https://leetcode.com/problems/number-of-substrings-containing-all-three-characters
 * @param {string} s
 * @return {number}
 */
var numberOfSubstrings = function(s) {
    
    let left = 0;
    let right = 0;
    let aCount = 0;
    let bCount = 0;
    let cCount = 0;
    let total = 0;

    while (right < s.length) {

        if (s[right] === "a") aCount++;
        if (s[right] === "b") bCount++;
        if (s[right] === "c") cCount++;

        while (aCount && bCount && cCount) {
            total += s.length - right;
            if (s[left] === "a") aCount--;
            if (s[left] === "b") bCount--;
            if (s[left] === "c") cCount--;
            left++;
        }

        right++;
    }

    return total;
};
