/**
 * https://leetcode.com/problems/minimum-number-of-flips-to-make-the-binary-string-alternating/
 * Time O(n), Space O(1)
 * @param {string} s
 * @return {number}
 */
var minFlips = (s) => {
    if (!s || s.length < 1) return 0;

    const initialLen = s.length;
    if (initialLen % 2 === 1) s += s;

    let evenCmp = 0;
    let oddCmp = 0;
    let result = Infinity;
    let end = 0;
    let start = 0;

    while (end < s.length) {
        if (end % 2 !== Number(s[end])) evenCmp++;
        if ((end % 2 ^ 1) !== Number(s[end])) oddCmp++;

        if (end >= initialLen) {
            if (start % 2 !== Number(s[start])) evenCmp--;
            if ((start % 2 ^ 1) !== Number(s[start])) oddCmp--;
            start++;
        }

        if (end >= initialLen - 1) {
            result = Math.min(evenCmp, oddCmp, result);
        }
        end++;
    }

    return result;
};
