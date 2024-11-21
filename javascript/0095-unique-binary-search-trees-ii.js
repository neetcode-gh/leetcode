/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * Recursion
 * Time O(4^n) | Space O(n)
 * https://leetcode.com/problems/unique-binary-search-trees-ii/ 
 * @param {number} n
 * @return {TreeNode[]}
 */
var generateTrees = function(n) {

    const dfs = (start, end) => {

        const result = [];

        if(start === end) {
            result.push(new TreeNode(start));
            return result;
        };
        if(start > end)  {
            result.push(null);
            return result;
        };

        for(let i = start; i < end + 1; i++) {
            const leftSubTrees = dfs(start, i - 1);
            const rightSubTrees = dfs(i + 1 , end);

            leftSubTrees.forEach((leftSubTree) => {
                rightSubTrees.forEach((rightSubTree) => {
                    const root = new TreeNode(i, leftSubTree, rightSubTree); 
                    result.push(root);
                });
            });            
        }

        return result;
    }

    return dfs(1, n);
};
