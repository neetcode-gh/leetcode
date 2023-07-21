/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */

// Time complexity: O(N)
// Space complexity: O(1)

var maxVowels = function (s, k) {
    const vowels = new Set(['a', 'e', 'i', 'o', 'u']);
    let left = 0;
    let count = 0;
    let result = 0;

    for (let right = 0; right < s.length; right++) {
        count += vowels.has(s[right]) ? 1 : 0;

        if (right - left + 1 > k) {
            count -= vowels.has(s[left]) ? 1 : 0;
            left++;
        }

        result = Math.max(result, count);
    }

    return result;
};
