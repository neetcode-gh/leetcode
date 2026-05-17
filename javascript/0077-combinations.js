/**
 * BackTracking | Recursion
 * Time O(((n!)/(n-k)!*k!)*k) | Space O((n!)/(n-k)!*k!) (Because we'll nedd the number of combinations space to store them in the array)
 * https://leetcode.com/problems/combinations/
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function(n, k) {
    
    const dfs = (idx, level, currCombo, combinations) => {
        if (level === k) {
            combinations.push(currCombo.slice(0));
            return;
        }

        for (let i = idx; i < n + 1; i++) {
            currCombo.push(i);
            dfs(i+1, level+1, currCombo, combinations);
            currCombo.pop();
        }

        return combinations;
    }

    return dfs(1, 0, [], []);
};


/**
 * Solution #2
 * BackTracking | Recursion
 * Time O(n^k) | Space O((n!)/(n-k)!*k!) (Because we'll nedd the number of combinations space to store them in the array)
 * https://leetcode.com/problems/combinations/
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine1 = function(n, k) {
    
    const dfs = (num, comb, allComb) => {
        if (comb.length === k) {
            allComb.push(comb);
            return allComb;
        }
        
        if (num === n+1) return allComb; // this if condition is written here because what if we are at num === n+1
        // and we have taken valid combo? Instead of adding in the above condition it would have written
        // immidiatly so we write this if condition after we've taken the combo. Hope it makes sence.

        const comb1 = [num, ...comb]; // take the num here
        const comb2 = [...comb]; // don't take the num
        dfs(num+1, comb1, allComb);
        dfs(num+1, comb2, allComb);
        
        return allComb;
    }
    
    return dfs(1, [], []);
};

