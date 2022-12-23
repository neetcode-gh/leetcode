/**
 * Brute force
 * Time O(N^2) | Space O(1)
 * https://leetcode.com/problems/valid-palindrome-ii
 * @param {string} s
 * @return {boolean}
 */
//
var validPalindromeBrute = function(s) {

    for (let i = 0; i < s.length; i++) {
        if (isPalindrome(s.slice(0, i) + s.slice(i + 1))) return true;
    }

    return false;
};

/**
 * Optimal Approach, Linear Time.
 * Time O(N) | Space O(1)
 * https://leetcode.com/problems/valid-palindrome-ii
 * @param {string} s
 * @return {boolean}
 */
//

var validPalindrome = function(s) {

    let left = 0;
    let right = s.length - 1;

    while (left < right) {
        if (s[left] !== s[right]) {

            if (
                isPalindrome(s.slice(left + 1, right + 1)) ||
                isPalindrome(s.slice(left, right))
            ) return true;

            return false;

        }
        left++;
        right--;
    };

    return true;
}

function isPalindrome(s) {
    return s.split('').reverse().join('') === s;
}
