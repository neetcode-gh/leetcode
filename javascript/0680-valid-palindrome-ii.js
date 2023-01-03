/**
 * @param {string} s
 * @return {boolean}
 */
var validPalindrome = function (s) {
    let l = 0;
    let r = s.length - 1;

    while (l < r) {
        console.log(l, r);
        if (s[l] !== s[r]) {
            const skipL = s.slice(l + 1, r + 1);
            const skipR = s.slice(l, r);
            return isPalindrome(skipL) || isPalindrome(skipR);
        }
        l++;
        r--;
    }
    return true;
};

const isPalindrome = (s) => {
    let l = 0;
    let r = s.length - 1;

    while (l < r) {
        if (s[l] !== s[r]) {
            return false;
        }
        l++;
        r--;
    }
    return true;
};
