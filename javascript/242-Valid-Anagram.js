/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
    
    //solution 1
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
    
    //solution 2
    if(s.length !== t.length) {
        return false;
    }
    let sMap = {};
    let tMap = {};
    for(let i = 0; i < s.length; i++) {
        if(sMap.hasOwnProperty(s[i])) {
            sMap[s[i]]++
        } else {
            sMap[s[i]] = 1;
        }
        if(tMap.hasOwnProperty(t[i])) {
            tMap[t[i]]++
        } else {
            tMap[t[i]] = 1;
        }
    }
    for(let k in sMap) {
        if(sMap[k] !== tMap[k]) {
            return false;
        }
    }
    return true;
};
