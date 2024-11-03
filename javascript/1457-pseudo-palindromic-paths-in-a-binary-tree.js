/**
 * 
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * DFS | Hashing | Backtraking | tree-traversal
 * Time O(n) | Space O(n)
 * https://leetcode.com/problems/pseudo-palindromic-paths-in-a-binary-tree/
 * @param {TreeNode} root
 * @return {number}
 */
var pseudoPalindromicPaths  = function(root) {
    
    const addNum = (num, hashSet) => {
        hashSet[num] = (hashSet[num] + 1) || 1;
    }

    const removeNum = (num, hashSet) => {
        hashSet[num] = hashSet[num] - 1;
        if (hashSet[num] === 0) delete hashSet[num];
    }

    const isPalindrome = (hashSet) => {

        let oddOccurances = 0;

        for (const key in hashSet) {
            if (hashSet[key] % 2) oddOccurances++;
        }

        return oddOccurances < 2;
    }

    const dfs = (node, hashSet) => {
        if (!node.left && !node.right && isPalindrome(hashSet)) return 1;
        if (!node.left && !node.right) return 0;

        let total = 0;
        if (node.left) {
            addNum(node.left.val, hashSet);
            total += dfs(node.left, hashSet);
            removeNum(node.left.val, hashSet);
        } 

        if (node.right) {
            addNum(node.right.val, hashSet);
            total += dfs(node.right, hashSet);
            removeNum(node.right.val, hashSet);
        }

        return total;
    }   

    return dfs(root, {[root.val]: 1} \);

};
