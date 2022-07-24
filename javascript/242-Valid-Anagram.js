/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
    // Base case
    if (s.length !== t.length) return false;

    let map = {};

    // Iterate through s and store values into map
    // If value exists, increment it by 1, otherwise set it's value to 1
    for (let idx = 0; idx < s.length; idx++) {
        map[s[idx]] ? map[s[idx]]++ : map[s[idx]] = 1;
    }

    // Iterate through t and decrement values from map
    // If value doesn't exist return false as strings can't be anagrams
    for (let idx = 0; idx < t.length; idx++) {
        if (map[t[idx]]) map[t[idx]]--;
        else return false;
    }

    return true;
};
