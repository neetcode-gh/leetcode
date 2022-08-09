/**
 * https://leetcode.com/problems/longest-substring-without-repeating-characters/
 * Time O(N) | Space O(N)
 * @param {string} s
 * @return {number}
 */

var lengthOfLongestSubstring = function(s) {
    map = new Map()
    l = 0
    res = 0
    
    for (let r=0; r < s.length; r++) {
        
        while (map.has(s[r])) {
            map.delete(s[l])
            l++
        }
    
        map.set(s[r], s[r])
        res = Math.max(res, r-l + 1)
        
    }
    return res
    
};
