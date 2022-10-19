/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function (x) {
    // Creates array from int characters
    // 121 -> [1,2,1]
    let arr = Array.from(String(x), Number);

    // Uses two pointer
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== arr[arr.length - 1 - i]) {
            return false;
        }
    }

    return true;
};

// Runtime: 302 ms, faster than 40.50% of JavaScript online submissions for Palindrome Number.
// Memory Usage: 51.8 MB, less than 8.36% of JavaScript online submissions for Palindrome Number.

/**
 * Reversing Integer With Modulo
 * Time O(N) | Space O(1)
 * https://leetcode.com/problems/palindrome-number/
 * @param {number} x
 * @return {boolean}
 */
 var isPalindrome = function(x) {
    if (x < 0) return false;

    const inputX = x;
    let revX = 0;

    while (x > 0) {
        revX += x % 10;
        x = Math.floor(x / 10);

        if (x > 0) revX *= 10
    }

    return revX === inputX;
};
