/**
 * https://leetcode.com/problems/valid-palindrome/
 * Time O(N) | Space O(1)
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (s) {
    if (!s.length) return true;

    s = s.toLowerCase();

    return isValid(s);
};

const isValid = (s) => {
    let [left, right] = [0, s.length - 1];

    while (left < right) {
        while (left < right && isNonAlphaNumeric(s[left])) left++;
        while (left < right && isNonAlphaNumeric(s[right])) right--;

        const isSame = s[left] === s[right];
        if (!isSame) return false;

        left++;
        right--;
    }

    return true;
};

const isNonAlphaNumeric = (char) => {
    const isNonAlpha = char < 'a' || 'z' < char; // a(97) - z(122)
    const isNonNumeric = char < '0' || '9' < char; // 0(48) - 9(57)

    return isNonAlpha && isNonNumeric;
};
