/**
 * Time O(N) | Space O(1)
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isSubsequence = function(s, t) {
    
    if(!s.length || (s === t)) return true;
    if(s.length > t.length) return false;
    
    let j = 0;
    
    for(let i = 0; i < t.length; i++) {
        if(s[j] === t[i]) {
            j++;
        }
    }
    
    return j === s.length;
};

/**
 * Time O(N^2) | Space O(1)
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isSubsequence = function(s, t) {
    for (let char of s) {
        let indexChar = t.indexOf(char);
        if (indexChar === -1) {
            return false;
        }
        t = t.slice(indexChar+1);
    }
    return true
};
