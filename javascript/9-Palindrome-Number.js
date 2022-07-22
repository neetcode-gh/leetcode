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
