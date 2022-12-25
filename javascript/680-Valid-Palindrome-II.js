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
            const isValid = isPalindrome(s, left, right) || isPalindrome(s, left + 1, right + 1);
            return isValid;
        }
        left++;
        right--;
    };

    return true;
}

const isPalindrome = (s, left, right) => {
    s = s.slice(left, right);
    return s === reOrder(s);
}

const reOrder = (s) => s.split('').reverse().join('');
