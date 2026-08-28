/**
 * Brute Force | Recursion
 * Time O(n) | Space O(1) (Time is actually n * 6!) (6! is a rough estimate of isValid);
 * https://leetcode.com/problems/find-the-punishment-number-of-an-integer
 * @param {number} n
 * @return {number}
 */
var punishmentNumber = function(n) {
    
    let total = 0;

    let i = 1;
    while (i < n+1) {
        
        const sqr = i**2;
        if (isValid(sqr, i)) {
            total += sqr;
        }
        i++;
    }

    return total;
};

const isValid = (sqr, target) => {

    const num = sqr.toString();

    const dfs = (idx, total) => {

        if (idx === num.length && total === target) return true;

        for (let i = idx; i < num.length; i++) {
            const nextNum = num.slice(idx,i+1);
            if (dfs(i+1, total + (+nextNum))) return true;
        }

        return false;
    }    

    return dfs(0, 0);
}
