/**
 * Linear Time.
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
                isValid(left + 1, right + 1) ||
                isValid(left, right)
            ) return true;

            return false;

        }
        left++;
        right--;
    };

    return true;
}

function isValid(s, left, right) {
    return s.slice(left, right).split('').reverse().join('') === s.slice(left, right);
}
