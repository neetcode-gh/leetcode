/**
 https://leetcode.com/problems/isomorphic-strings/
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isIsomorphic = function (s, t) {
    if (s.length !== t.length) {
        return false;
    }
    let sHashMap = {};
    let tHashMap = {};
    let cur = 0;
    while (cur <= s.length - 1) {
        if (sHashMap[s[cur]] !== tHashMap[t[cur]]) {
            return false;
        }
        sHashMap[s[cur]] = cur + 1;
        tHashMap[t[cur]] = cur + 1;
        cur++;
    }
    return true;
};
