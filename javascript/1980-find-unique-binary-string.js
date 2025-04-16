/**
 * BackTracking | Recursion | BruteForce
 * Time O(2^n) | Space O(n)
 * https://leetcode.com/problems/find-unique-binary-string
 * @param {string[]} nums
 * @return {string}
 */
var findDifferentBinaryString = function(nums) {
    
    let isFound = false;
    let missing = "";
    const present = new Set(nums);
    const n = nums[0].length;

    const dfs = (binaryStr) => {

        if (isFound) return;

        if (binaryStr.length === n) {
            if (!present.has(binaryStr)) {
                isFound = true;
                missing = binaryStr;
                return;
            }

            return;
        } 

        dfs(binaryStr+"0");
        dfs(binaryStr+"1");
    }

    dfs("");
    return missing;
};
