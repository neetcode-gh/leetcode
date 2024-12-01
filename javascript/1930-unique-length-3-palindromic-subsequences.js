/**
 * @param {string} s
 * @return {number}
 */
var countPalindromicSubsequence = function (s) {
    let count = 0;
    let chars = new Set(s);
    for(const char of chars){
        let first = s.indexOf(char),last = s.lastIndexOf(char);
        count += new Set(s.slice(first + 1, last)).size;
    }
    return count;
};
