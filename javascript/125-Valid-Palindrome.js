/**
 * Array - Filter && Clone && Reverse
 * Time O(N) | Space O(N)
 * https://leetcode.com/problems/valid-palindrome/
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
    if (!s.length) return true;
    
    const alphaNumeric = filterAlphaNumeric(s);/* Time O(N) | Space O(N) */
    const reversed = reverse(alphaNumeric);    /* Time O(N) | Space O(N) */
    
    return alphaNumeric === reversed;
};

const filterAlphaNumeric = (s, nonAlphaNumeric = new RegExp('[^a-z0-9]','gi')) => s
    .toLowerCase()               /* Time O(N) | Space O(N) */
    .replace(nonAlphaNumeric, '')/* Time O(N) | Space O(N) */

const reverse = (s) => s
    .split('')/* Time O(N) | Space O(N) */
    .reverse()/* Time O(N) | Space O(N) */
    .join('');/* Time O(N) | Space O(N) */

/**
 * 2 Pointer | Midde Convergence
 * Time O(N) | Space O(1)
 * https://leetcode.com/problems/valid-palindrome/
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
    if (s.length <= 1) return true;
    
    let [left, right] = [0, s.length - 1];
    let leftChar, rightChar;
    while (left < right) {
        leftChar = s[left];
        rightChar = s[right];
        
        // skip char if non-alphanumeric
        if (!/[a-zA-Z0-9]/.test(leftChar)) {
            left++;
        } else if (!/[a-zA-Z0-9]/.test(rightChar)) {
            right--;
        } else {
            // compare letters
            if (leftChar.toLowerCase() != rightChar.toLowerCase()) {
                return false;
            }
            left++;
            right--;
        }
    }
    return true;
};
