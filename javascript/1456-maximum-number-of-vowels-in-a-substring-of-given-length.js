/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */

// Time complexity: O(N)
// Space complexity: O(1)

var maxVowels = function (s, k) {
    const vowels = new Set(['a', 'e', 'i', 'o', 'u']);
    let [left, right] = [0, 0];
    let count = 0;
    let result = 0;

    while (right < s.length) {
        count += vowels.has(s[right]) ? 1 : 0;

        if (right - left + 1 > k) {
            count -= vowels.has(s[left]) ? 1 : 0;
            left++;
        }
        right += 1;

        result = Math.max(result, count);
    }

    return result;
};
