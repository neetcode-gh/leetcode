/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * Tree | Backtracking
 * Time O(n^2) | Space O(n)
 * https://leetcode.com/problems/smallest-string-starting-from-leaf/
 * @param {TreeNode} root
 * @return {string}
 */
var smallestFromLeaf = function(root) {

    let biggestStr = new Array(8500).fill("z");
    biggestStr = biggestStr.join("");

    let smallest = biggestStr;
    const dfs = (node, str) => {

        const char = String.fromCharCode(node.val+97);

        if (!node.left && !node.right) {
            str.push(char);
            const str1 = str.slice(0).reverse().join("");
            if (str1 < smallest) {
                smallest = str1;
            }
            str.pop();
            return;

        }

        if (node.left) {
            str.push(char);
            dfs(node.left, str);
            str.pop();
        }

        if (node.right) {
            str.push(char);
            dfs(node.right, str);
            str.pop();
        }        
    }

    dfs(root,[]);

    return smallest;
};
