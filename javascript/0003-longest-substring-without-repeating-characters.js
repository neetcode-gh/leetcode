/**
 * https://leetcode.com/problems/longest-substring-without-repeating-characters/
 * Time O(N) | Space O(N)
 * @param {string} s
 * @return {number}
 */

var lengthOfLongestSubstring = function (s) {
    const set = new Set();
    let l = 0;
    let max = 0;

    for (let r = 0, sl = s.length; r < sl; r++) {
        while (set.has(s[r])) {
            set.delete(s[l]);
            l++;
        }

        set.add(s[r]);
        max = Math.max(max, set.size);
    }
    return max;
};
