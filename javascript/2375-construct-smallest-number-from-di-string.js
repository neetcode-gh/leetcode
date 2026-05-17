/**
 * Recursion | Backtracking | BruteForce
 * Time O(n!) | Space O(n)
 * https://leetcode.com/problems/construct-smallest-number-from-di-string
 * @param {string} pattern
 * @return {string}
 */
var smallestNumber = function(pattern) {

    const digitSet = new Set([
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9
    ]);

    let min = Infinity;

    const dfs = (len, num) => {

        if (len === pattern.length+1 && isValid(num, pattern)) {
            min = Math.min(min, +num.join(""));
            return;
        } 

        if (len === pattern.length+1) return;

        for (const digit of [...digitSet]) {
            digitSet.delete(digit);
            num.push(digit);
            dfs(len+1, num);
            num.pop();
            digitSet.add(digit);
        }
    }

    dfs(0, []);
    return min.toString();
};

const isValid = (num, pattern) => {
    
    for (let i = 1; i < num.length; i++) {
        if (pattern[i-1] === "I" && num[i] < num[i-1]) return false;
        if (pattern[i-1] === "D" && num[i] > num[i-1]) return false;
    }

    return true;
}
