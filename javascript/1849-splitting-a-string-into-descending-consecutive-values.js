/**
 * BackTracking | DFS
 * Time O(n^2) | Space O(n) 
 * https://leetcode.com/problems/splitting-a-string-into-descending-consecutive-values/
 * @param {string} s
 * @return {boolean}
 */
var splitString = function(s) {

    const dfs = (start, pre) => {
        if (start === s.length) return true;
        for (let i = start; i < s.length;  i++) {
            const subStr = s.slice(start, i+1);
            if ((+pre) - (+subStr) === 1) {
                if( dfs(i+1, subStr)) return true;
            }
        }

        return false;
    }

    for (let i = 0; i < s.length; i++) {
        const subStr = s.slice(0, i+1);
        if (i+1 === s.length) continue; // this means we took the entire string without spliting atleast once.
        if (dfs(i+1, subStr)) return true;
    }

    return false;
};
