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
    if (!s.length) return true;

    return isValid(s);/* Time O(N) */
};

const isValid = (s) => {
    let [ left, right ] =  [ 0, (s.length - 1) ];

    while (left < right) {                          /* Time O(N) */
        [ left, right ] = moveToMid(s, left, right);/* Time O(N) */

        const [ leftCode, rightCode ] = getCodes(s, left, right);
  
        const isEqual = leftCode === rightCode;
        if (!isEqual) return false;

        left++; right--;
    }

    return true;
}

const moveToMid = (s, left, right) => {
    while ((left < right) && !isAlphaNumeric(s[left])) left++;  /* Time O(N) */
    while ((left < right) && !isAlphaNumeric(s[right])) right--;/* Time O(N) */
    
    return [ left, right ];
}

const getCodes = (s, left, right) => [ getCode(s[left]), getCode(s[right]) ];

const getCode = (char) => char.toLowerCase().charCodeAt(0);

const isAlphaNumeric = (char) => {
    const code = getCode(char);
    
    const [ a, z ] = [ 97, 122 ];
    const isAlpha = (a <= code) && (code <= z);

    const [ zero, nine ] = [ 48, 57 ];
    const isNumeric = (zero <= code) && (code <= nine);

    return isAlpha || isNumeric;
};
