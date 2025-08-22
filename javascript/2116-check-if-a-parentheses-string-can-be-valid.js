/**
 * Stack | Greedy
 * Time O(n) | Space O(n)
 * https://leetcode.com/problems/check-if-a-parentheses-string-can-be-valid
 * @param {string} s
 * @param {string} locked
 * @return {boolean}
 */
var canBeValid = function(s, locked) {

    const unlockedStack = [];
    const lockedStack = [];

    for (let i = 0; i < s.length; i++) {

        if (locked[i] === "0") {
            unlockedStack.push(i);
            continue;
        }

        if (s[i] === "(") {
            lockedStack.push(i);
            continue;
        }

        if (s[i] === ")") {

            if (lockedStack.length) {
                lockedStack.pop();
                continue;
            }

            if (unlockedStack.length) {
                unlockedStack.pop();
                continue;
            } 

            return false;
        }
    }

    while (lockedStack.length && 
           unlockedStack.length && 
           lockedStack[lockedStack.length - 1] < unlockedStack[unlockedStack.length - 1]) {
            lockedStack.pop();
            unlockedStack.pop();
    }

    return unlockedStack.length % 2 === 0 && lockedStack.length === 0;
};

/**
 * Brute Force | Recursion | BackTracking
 * Time (2^n * n) | Space O(n)
 * https://leetcode.com/problems/check-if-a-parentheses-string-can-be-valid
 * @param {string} s
 * @param {string} locked
 * @return {boolean}
 */
var canBeValidBF = function(s, locked) {
    
    if (!s.length) return false;
    if (s[0] === ")" && locked[0] === "1") return false;
    if (s[s.length - 1] === "(" && locked[locked.length - 1] === "1") return false;

    const dfs = (idx, arr) => {
        
        if (idx === s.length && isValid(arr)) return true;
        if (idx === s.length) return false;

        // we have two choices. either change it or not change it.
        if (locked[idx] === "0") {
            arr.push("(");
            const choice1 = dfs(idx+1, arr);
            arr.pop();

            if (choice1) return choice1;

            arr.push(")");
            const choice2 = dfs(idx+1, arr);
            arr.pop();

            return choice2;
        }

        // we only have once choice.
        if (s[idx] === "(") {
            arr.push("(");
            const val = dfs(idx+1, arr);
            arr.pop();
            return val;
        }

        if (s[idx] === ")") {
            arr.push(")");
            const val = dfs(idx+1, arr);   
            arr.pop();
            return val;         
        }
    }

    return dfs(0, []);
};

const isValid = (arr) => {

    let balancer = 0;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === "(") balancer++;
        if (arr[i] === ")") balancer--;
    }

    return balancer === 0;
}
