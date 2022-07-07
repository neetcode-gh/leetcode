/**
 * https://leetcode.com/problems/generate-parentheses/
 * 
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
    const parens = []
    const current = []
    
    function exploreParens(opensRemaining, closesAvailable) {
        if (current.length == n * 2) {
            parens.push(current.join(""))
            return
        }
        
        if (opensRemaining) {
            current.push("(")
            exploreParens(opensRemaining - 1, closesAvailable + 1)
            current.pop()
        }
        
        if (closesAvailable) {
            current.push(")")
            exploreParens(opensRemaining, closesAvailable - 1)
            current.pop()
        }
    }
    
    exploreParens(n, 0)
    
    return parens
};
