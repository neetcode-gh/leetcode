/**
 * Submission Details: 
 * https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/
 * Time O(n * m), Space O(1)
 * Runtime: 48ms (beats 91.92%) || 41.6mb (beats 78.25%)
 */

/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function(haystack, needle) {
    if (needle.length == 0) return 0;
    for (let i = 0; i < haystack.length; i++) {
        let k = i, j = 0;
        while (haystack[k] == needle[j] && j < needle.length) {
            k++, j++;
        }
        if (j == needle.length) return i;
    }
    return -1; 
}