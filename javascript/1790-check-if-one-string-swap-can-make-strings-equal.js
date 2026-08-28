/**
 * Hashmap
 * Time O(n) | Space O(1)
 * https://leetcode.com/problems/check-if-one-string-swap-can-make-strings-equal
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var areAlmostEqual = function(s1, s2) {

    if (s1 === s2) return true;

    const s1Freq = {};
    const s2Freq = {};
    // add frequencies
    for (let i = 0; i < s1.length; i++) {
        const char1 = s1[i];
        const char2 = s2[i];
        s1Freq[char1] = (s1Freq[char1] && s1Freq[char1] + 1) || 1;
        s2Freq[char2] = (s2Freq[char2] && s2Freq[char2] + 1) || 1;
    }

    // check if all chars are presentn in both strings
    for (const char in s1Freq) {
        if (s1Freq[char] !== s2Freq[char]) return false;
    }
    for (const char in s2Freq) {
        if (s2Freq[char] !== s1Freq[char]) return false;
    }

    let mismatchCount = 0;
    // check if mismatch exceed 2
    for (let i = 0; i < s1.length; i++) {
        if (s1[i] !== s2[i]) mismatchCount++;
        if (mismatchCount > 2) return false;
    }

    return true;
};
