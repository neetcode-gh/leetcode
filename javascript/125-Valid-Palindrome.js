/**
 * Simpler and cleaner solution with the help of regex and string functions of JS
 * https://leetcode.com/problems/valid-palindrome/
 * Time O(N) | Space O(1)
 * @param {string} s
 * @return {boolean}
 */

var isPalindrome = function(s) {
    s = s.replace(/[^a-zA-Z0-9]/gi, '').toLowerCase().trim();
    if(!s.length){
        return true;
    }
    let e = s.length - 1;
    for(let i = 0; i<s.length; i++){
        if(i>e || i==e){
            return true;
        }
        if(s[i] != s[e]){
            return false;
        }
        e--;
    }
};

/**
 * https://leetcode.com/problems/valid-palindrome/
 * Time O(N) | Space O(1)
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
    if (!s.length) return true;

    s = s.toLowerCase();

    return isValid(s);
};

const isValid = (s) => {
    let [ left, right ] =  [ 0, (s.length - 1) ];

    while (left < right) {
        while ((left < right) && isNonAlphaNumeric(s[left])) left++;
        while ((left < right) && isNonAlphaNumeric(s[right])) right--;

        const isSame = s[left] === s[right];
        if (!isSame) return false;

        left++; right--;
    }

    return true;
}

const isNonAlphaNumeric = (char) => {
    const isNonAlpha = char < 'a' || 'z' < char;    // a(97) - z(122)
    const isNonNumeric = char < '0' || '9' < char;  // 0(48) - 9(57)

    return isNonAlpha && isNonNumeric;
};
