/**
 * Sliding Window
 * Time O(n) | Space O(1)
 * https://leetcode.com/problems/maximum-number-of-vowels-in-a-substring-of-given-length/
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var maxVowels = function(s, k) {
    
    if (k > s.length) return 0;

    const vowels = new Set(["a", "e", "i", "o", "u"]);

    let left = 0;
    let right = k-1;
    let currentVowels = 0;
    for (let i = 0; i < k; i++) {
        if (vowels.has(s[i])) currentVowels++;
    }

    let max = currentVowels;
    
    while (right < s.length) {
        if (vowels.has(s[left])) currentVowels--;
        left++;
        right++;
        if (vowels.has(s[right])) currentVowels++;
        max = Math.max(max, currentVowels);
    }

    return max;
};
