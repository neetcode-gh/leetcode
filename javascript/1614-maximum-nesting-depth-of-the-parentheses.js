/**
 * Stack 
 * Time O(n) | Space O(1)
 * https://leetcode.com/problems/maximum-nesting-depth-of-the-parentheses
 * @param {string} s
 * @return {number}
 */
var maxDepth = function(s) {
    let currDepth = 0;
    let maxDepth = 0;
    for (let i = 0; i < s.length; i++) {
        if (s[i] === "(") currDepth++;
        maxDepth = Math.max(currDepth, maxDepth);
        if (s[i] === ")")  currDepth--;
    }
    return maxDepth;
};
