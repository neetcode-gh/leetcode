/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
    let map = {};
    
    if (s.length !== t.length) {
        return false;
    }
    
    for (let i = 0; i < s.length; i++) {
        if (map[s[i]]) {
            map[s[i]]++;
        } else {
            map[s[i]] = 1;
        }
    }
    
    for (let i = 0;  i < t.length; i++) {
        if (map[t[i]]) {
            map[t[i]]--;
        } else {
            return false;
        }
    }
    
    return true;
    
    
    
    
};
