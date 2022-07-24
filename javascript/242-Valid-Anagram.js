/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
    if (s.length !== t.length) return false;

    let map = {};

    for (let idx = 0; idx < s.length; idx++) {
        map[s[idx]] ? map[s[idx]]++ : map[s[idx]] = 1;
    }

    for (let idx = 0; idx < t.length; idx++) {
        if (map[t[idx]]) map[t[idx]]--;
        else return false;
    }

    return true;
};
