/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 * 
 * 
 * complexity
 * Time  O(2n)
 * Space O(2n)
 * 
 * Runtime: 146 ms, faster than 29.80% of JavaScript online submissions for Valid Anagram.
 * Memory Usage: 50 MB, less than 5.51% of JavaScript online submissions for Valid Anagram.
 */
 var isAnagram = function(s, t) {
    if(s.length !== t.length) return false;
    const mapS = {}, mapT = {};
    for(const i in s){
        mapS[s[i]] ? mapS[s[i]] += 1 : mapS[s[i]]= 1;
        mapT[t[i]] ? mapT[t[i]] += 1 : mapT[t[i]]= 1;
    }
    for(const i in mapS){
        if (mapS[i] !== mapT[i]) return false;    
    }
    return true;
};