/**
 * https://leetcode.com/problems/longest-substring-without-repeating-characters/
 * Time O(N) | Space O(N)
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s, map = new Map()) {
    let [ left, right, max ] = [ 0, 0, 0];

    while (right < s.length) {
        const rightChar = s[right];

        const canSlide = map.has(rightChar);
        if (canSlide) {
            const rightIndex = map.get(rightChar) + 1;

            left = Math.max(left, rightIndex);
        }

        const window = (right - left) + 1;

        max = Math.max(max, window);
        map.set(rightChar, right);
        right++;
    }

    return max;
};
