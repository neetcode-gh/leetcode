/**
 * Recursion | BruteForce
 * Time O(3 * 2^n-1) | Space O(n)
 * https://leetcode.com/problems/the-k-th-lexicographical-string-of-all-happy-strings-of-length-n
 * @param {number} n
 * @param {number} k
 * @return {string}
 */
var getHappyString = function(n, k) {
    
    if (k > 3 * 2**(n-1)) return "";

    let isFound = false;
    let ans = "";
    let idx = 0;

    const dfs = (pre, currStr) => {

        if (isFound) return;

        if (currStr.length === n) {
            idx++;
            if (idx === k) {
                ans = currStr;
                isFound = true;
                return;
            }
            return;
        }

        if (pre === "a") {
            dfs("b", currStr + "b");
            dfs("c", currStr + "c");
        }

        if (pre === "b") {
            dfs("a", currStr + "a");
            dfs("c", currStr + "c");
        }

        if (pre === "c") {
            dfs("a", currStr + "a");
            dfs("b", currStr + "b");
        }
    }

    !isFound && dfs("a", "a");
    !isFound && dfs("b", "b");
    !isFound && dfs("c", "c");

    return ans;
};
