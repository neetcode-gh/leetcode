/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * Hashing 
 * Time O(n^2) | Space O(n^2)
 * https://leetcode.com/problems/find-duplicate-subtrees/
 * @param {TreeNode} root
 * @return {TreeNode[]}
 */
var findDuplicateSubtrees = function(root) {
    
    const stringHash = {};

    const makePreOrderStr = (node, str) => {
        if(!node) return str + "-" + "null";
        
        const str1 = makePreOrderStr(node.left, str + "-" + node.val);
        const str2 = makePreOrderStr(node.right, str1);

        return str2;
    }

    const duplicates = [];

    const dfs = (node) => {
        if(!node) return;
        const str = makePreOrderStr(node, "");

        if(!stringHash[str]) {
            stringHash[str] = [];
        }
        
        stringHash[str].push(node);

        dfs(node.left);
        dfs(node.right);
    }   

    dfs(root);
    
    for (let key in stringHash) {
        if(stringHash[key].length > 1) duplicates.push(stringHash[key][0]);
    }

    return duplicates;
};
