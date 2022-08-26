/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */

// First method using hashmap with for loop
var isAnagram = function (s, t) {
    if (s.length !== t.length) {
        return false;
    }
    let sMap = {};
    let tMap = {};
    for (let i = 0; i < s.length; i++) {
        if (sMap.hasOwnProperty(s[i])) {
            sMap[s[i]]++;
        } else {
            sMap[s[i]] = 1;
        }
        if (tMap.hasOwnProperty(t[i])) {
            tMap[t[i]]++;
        } else {
            tMap[t[i]] = 1;
        }
    }
    for (let k in sMap) {
        if (sMap[k] !== tMap[k]) {
            return false;
        }
    }
    return true;
};

// Second method using filtering duplicates with reduce method
var isAnagram = function(firstStr, secondStr) {
    if (firstStr.length !== secondStr.length) return false;

    const uniqueCharsArray = firstStr
        .split("")
        .reduce((str, char) => str.replace(char, ""), secondStr);

    return !uniqueCharsArray.length;
}
